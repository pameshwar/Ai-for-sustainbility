import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { handleOnboarding, getFacilityProfile } from '../controllers/onboardingController.js';
import { handleBatchTelemetry, getTelemetryReadings, injectSimulatedSpike } from '../controllers/telemetryController.js';
import { 
  generateAssessment, 
  getLatestAssessment, 
  updateActionItemStatus, 
  getSustainabilityReport 
} from '../controllers/assessmentController.js';
import { seedDefaultFacility } from '../db/store.js';

const router = Router();

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'EcoPulse AI Engine',
    timestamp: new Date().toISOString(),
    gemini_configured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'),
    supabase_configured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_URL.startsWith('http'))
  });
});

// Demo seed trigger
router.post('/seed-demo', requireAuth, (req, res) => {
  const userId = req.user.id;
  seedDefaultFacility(userId);
  res.json({ success: true, message: `Demo facility seeded for user ${userId}` });
});

// Facility Onboarding Routes
router.post('/onboarding', requireAuth, handleOnboarding);
router.get('/onboarding/profile', requireAuth, getFacilityProfile);

// Telemetry Ingestion & Query Routes
router.post('/telemetry/batch', requireAuth, handleBatchTelemetry);
router.get('/telemetry', requireAuth, getTelemetryReadings);
router.post('/telemetry/simulate-spike', requireAuth, injectSimulatedSpike);

// AI Assessment & Action Items Routes
router.post('/assessment/generate', requireAuth, generateAssessment);
router.get('/assessment/latest', requireAuth, getLatestAssessment);
router.patch('/action-items/:id/status', requireAuth, updateActionItemStatus);

// Sustainability & ESG Executive Reports
router.get('/reports/sustainability', requireAuth, getSustainabilityReport);

export default router;
