import { UpdateStatusSchema } from '../schema/validation.js';
import { db } from '../db/store.js';
import { runSustainabilityAudit } from '../services/gemini.js';

export async function generateAssessment(req, res) {
  try {
    const userId = req.user.id;
    const profile = await db.getProfile(userId);
    const telemetry = await db.getTelemetry(userId, { limit: 120 });

    if (!profile) {
      return res.status(404).json({ error: 'Facility profile not found. Please complete onboarding first.' });
    }

    // Call Gemini 2.5 Pro with structured schema output
    const auditResult = await runSustainabilityAudit(profile, telemetry);

    // Save assessment and action items to database
    const saved = await db.saveAssessment(userId, auditResult, auditResult.anomalies);

    res.status(201).json({
      success: true,
      message: 'AI sustainability audit completed successfully',
      assessment: saved.assessment,
      action_items: saved.action_items
    });
  } catch (err) {
    console.error('Error generating assessment:', err);
    res.status(500).json({ error: 'Failed to generate sustainability assessment', details: err.message });
  }
}

export async function getLatestAssessment(req, res) {
  try {
    const userId = req.user.id;
    const latest = await db.getLatestAssessment(userId);
    const profile = await db.getProfile(userId);

    res.json({
      success: true,
      facility: profile,
      assessment: latest.assessment,
      action_items: latest.action_items
    });
  } catch (err) {
    console.error('Error getting latest assessment:', err);
    res.status(500).json({ error: 'Failed to retrieve assessment' });
  }
}

export async function updateActionItemStatus(req, res) {
  try {
    const { id } = req.params;
    const parseResult = UpdateStatusSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({ 
        error: 'Invalid status', 
        details: parseResult.error.flatten().fieldErrors 
      });
    }

    const userId = req.user.id;
    const { status } = parseResult.data;

    const result = await db.updateActionItemStatus(userId, id, status);

    if (!result.item) {
      return res.status(404).json({ error: 'Action item not found' });
    }

    res.json({
      success: true,
      message: `Action item marked as ${status}`,
      item: result.item,
      new_ecopulse_score: result.new_score,
      resolved_count: result.resolved_count,
      total_count: result.total_count
    });
  } catch (err) {
    console.error('Error updating action item status:', err);
    res.status(500).json({ error: 'Failed to update action item status' });
  }
}

export async function getSustainabilityReport(req, res) {
  try {
    const userId = req.user.id;
    const report = await db.getSustainabilityReport(userId);

    res.json({
      success: true,
      report
    });
  } catch (err) {
    console.error('Error generating sustainability report:', err);
    res.status(500).json({ error: 'Failed to generate sustainability report' });
  }
}
