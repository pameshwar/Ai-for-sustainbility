import { OnboardingSchema } from '../schema/validation.js';
import { db } from '../db/store.js';

export async function handleOnboarding(req, res) {
  try {
    const parseResult = OnboardingSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: parseResult.error.flatten().fieldErrors 
      });
    }

    const userId = req.user.id;
    const profile = await db.saveProfile(userId, parseResult.data);

    // If client supplied initial baseline telemetry or wants seed data
    if (req.body.baseline_telemetry && Array.isArray(req.body.baseline_telemetry)) {
      await db.insertTelemetryBatch(userId, req.body.baseline_telemetry);
    }

    res.status(201).json({
      success: true,
      message: 'Facility profile and meters registered successfully',
      profile
    });
  } catch (err) {
    console.error('Error in handleOnboarding:', err);
    res.status(500).json({ error: 'Failed to save facility profile' });
  }
}

export async function getFacilityProfile(req, res) {
  try {
    const userId = req.user.id;
    const profile = await db.getProfile(userId);
    res.json({ success: true, profile });
  } catch (err) {
    console.error('Error in getFacilityProfile:', err);
    res.status(500).json({ error: 'Failed to fetch facility profile' });
  }
}
