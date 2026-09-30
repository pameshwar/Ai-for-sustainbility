import { TelemetryIngestSchema } from '../schema/validation.js';
import { db } from '../db/store.js';

export async function handleBatchTelemetry(req, res) {
  try {
    const parseResult = TelemetryIngestSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ 
        error: 'Telemetry validation failed', 
        details: parseResult.error.flatten().fieldErrors 
      });
    }

    const userId = req.user.id;
    const inserted = await db.insertTelemetryBatch(userId, parseResult.data.telemetry);

    res.status(201).json({
      success: true,
      message: `Ingested ${inserted.length} telemetry readings successfully`,
      count: inserted.length
    });
  } catch (err) {
    console.error('Error in handleBatchTelemetry:', err);
    res.status(500).json({ error: 'Failed to ingest telemetry readings' });
  }
}

export async function getTelemetryReadings(req, res) {
  try {
    const userId = req.user.id;
    const { resource_type, limit = 200 } = req.query;

    const data = await db.getTelemetry(userId, { 
      resourceType: resource_type, 
      limit: parseInt(limit, 10) 
    });

    res.json({
      success: true,
      count: data.length,
      telemetry: data
    });
  } catch (err) {
    console.error('Error in getTelemetryReadings:', err);
    res.status(500).json({ error: 'Failed to retrieve telemetry' });
  }
}

// Demo utility: Injects a simulated anomaly spike in real-time
export async function injectSimulatedSpike(req, res) {
  try {
    const userId = req.user.id;
    const { domain = 'energy_hvac' } = req.body;

    const spikeValues = {
      energy_hvac: { value: 720, unit: 'kWh', note: 'Sudden Unscheduled Chiller Compressor Surge' },
      water_plumbing: { value: 2400, unit: 'Liters', note: 'High-Pressure Main Riser Rupture Simulation' },
      waste_management: { value: 340, unit: 'kg', note: 'Bulk Unsorted Cardboard Loading Dock Dumping' }
    };

    const target = spikeValues[domain] || spikeValues.energy_hvac;

    const spikeReading = [{
      resource_type: domain,
      metric_value: target.value,
      metric_unit: target.unit,
      recorded_at: new Date().toISOString(),
      metadata: { simulated_event: true, note: target.note }
    }];

    await db.insertTelemetryBatch(userId, spikeReading);

    res.json({
      success: true,
      message: `Simulated anomaly spike injected into ${domain}`,
      spike: spikeReading[0]
    });
  } catch (err) {
    console.error('Error in injectSimulatedSpike:', err);
    res.status(500).json({ error: 'Failed to inject simulation spike' });
  }
}
