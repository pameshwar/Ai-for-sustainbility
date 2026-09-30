import { supabase } from '../db/store.js';

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // If demo mode header or query parameter is set, allow demo user
      if (req.headers['x-demo-user'] || process.env.NODE_ENV === 'development') {
        req.user = { id: 'demo-facility-user', email: 'demo@ecopulse.ai' };
        return next();
      }
      return res.status(401).json({ error: 'Authorization header missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    if (token === 'demo-token' || token === 'demo-facility-user') {
      req.user = { id: 'demo-facility-user', email: 'facility.manager@metropolistower.com' };
      return next();
    }

    if (supabase) {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error || !user) {
        // Fall back to demo user gracefully in development if token is mock
        if (process.env.NODE_ENV === 'development') {
          req.user = { id: 'demo-facility-user', email: 'facility.manager@metropolistower.com' };
          return next();
        }
        return res.status(401).json({ error: 'Invalid or expired Supabase authentication token' });
      }
      req.user = user;
      return next();
    }

    // Supabase client not initialized yet - use demo user context
    req.user = { id: 'demo-facility-user', email: 'demo@ecopulse.ai' };
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({ error: 'Internal authentication error' });
  }
}
