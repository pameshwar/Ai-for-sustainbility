import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

export const supabase = (supabaseUrl && supabaseUrl.startsWith('http') && supabaseKey && supabaseKey !== 'your_secret_key_here')
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// In-Memory resilient fallback store for demo & local development
const memoryStore = {
  profiles: new Map(),
  telemetry: new Map(),
  assessments: new Map(),
  actionItems: new Map(),
};

// Seed default demo facility data for instant out-of-the-box experience
export function seedDefaultFacility(userId = 'demo-facility-user') {
  const profile = {
    id: userId,
    facility_name: 'Metropolis Tower One',
    facility_type: 'Commercial Office',
    square_footage: 75000,
    operating_hours: '08:00 - 18:00 (Mon-Fri)',
    target_goals: ['Reduce Peak Demand', 'Eliminate Leaks', 'Improve Recycling Ratio', 'Net Zero Carbon'],
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    updated_at: new Date().toISOString()
  };
  memoryStore.profiles.set(userId, profile);

  // Generate 7 days of realistic hourly telemetry across energy_hvac, water_plumbing, waste_management
  const telemetryList = [];
  const now = Date.now();
  for (let i = 168; i >= 0; i--) {
    const time = new Date(now - i * 3600000);
    const hour = time.getHours();
    const isWorkHours = hour >= 8 && hour <= 18;
    const isWeekend = time.getDay() === 0 || time.getDay() === 6;

    // Energy: base 180-220 kW, work hours 450-580 kW + anomalous peak on day 2 night
    let energyKwh = isWorkHours && !isWeekend ? 450 + Math.sin(hour) * 90 + Math.random() * 40 : 190 + Math.random() * 30;
    // Inject realistic 2 AM anomaly 2 days ago
    if (i >= 46 && i <= 50) {
      energyKwh += 180; // Off-hours HVAC cooling spike
    }

    // Water: base 200-350 L, peak 800-1400 L
    let waterLiters = isWorkHours && !isWeekend ? 900 + Math.random() * 350 : 240 + Math.random() * 80;
    // Inject persistent slow leak overnight
    if (i <= 36 && i >= 12 && !isWorkHours) {
      waterLiters += 280; // Restroom solenoid weeping
    }

    // Waste: logged primarily during cleaning and evening shifts
    let wasteKg = (hour === 19 || hour === 20) ? (isWeekend ? 45 + Math.random() * 20 : 180 + Math.random() * 60) : (Math.random() > 0.85 ? 15 + Math.random() * 10 : 5 + Math.random() * 5);

    telemetryList.push({
      id: uuidv4(),
      user_id: userId,
      resource_type: 'energy_hvac',
      metric_value: Math.round(energyKwh * 10) / 10,
      metric_unit: 'kWh',
      recorded_at: time.toISOString(),
      metadata: { temperature_ambient_f: 74, zone: 'Primary Central Plant' }
    });

    telemetryList.push({
      id: uuidv4(),
      user_id: userId,
      resource_type: 'water_plumbing',
      metric_value: Math.round(waterLiters * 10) / 10,
      metric_unit: 'Liters',
      recorded_at: time.toISOString(),
      metadata: { flow_rate_gpm: Math.round((waterLiters / 3.785) * 10) / 10, zone: 'Main Inflow Riser' }
    });

    telemetryList.push({
      id: uuidv4(),
      user_id: userId,
      resource_type: 'waste_management',
      metric_value: Math.round(wasteKg * 10) / 10,
      metric_unit: 'kg',
      recorded_at: time.toISOString(),
      metadata: { stream: 'Solid / Mixed Landfill', diversion_rate: '38%' }
    });
  }

  memoryStore.telemetry.set(userId, telemetryList);

  // Default Assessment
  const assessmentId = uuidv4();
  const assessment = {
    id: assessmentId,
    user_id: userId,
    ecopulse_score: 71,
    summary: 'Metropolis Tower One demonstrates high baseline energy reliability but shows 2 critical resource leaks: off-hours cooling cycling at 02:00 AM and secondary water riser weeping. Remediation can recover $52,800/yr.',
    created_at: new Date(Date.now() - 3600000).toISOString()
  };
  memoryStore.assessments.set(userId, assessment);

  // Default Action Items
  const items = [
    {
      id: uuidv4(),
      assessment_id: assessmentId,
      user_id: userId,
      title: 'Off-Hours HVAC Chiller Overcooling (02:00 - 05:00 AM)',
      category: 'energy_hvac',
      severity: 'CRITICAL',
      impact_description: 'Chiller plant staging indicates compressor 2 engages repeatedly during unoccupied hours due to stuck cooling override sensor on Floor 7.',
      remediation_steps: [
        'Audit BMS schedule overrides and lock night setback at 78°F (25.5°C).',
        'Inspect and recalibrate zone temperature thermistor on 7th floor mechanical room.',
        'Reset variable speed drives (VFD) on secondary chilled water pumps to 30 Hz minimum.'
      ],
      est_cost_savings_usd: 21500,
      est_carbon_reduction_kg: 58200,
      status: 'PENDING',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: uuidv4(),
      assessment_id: assessmentId,
      user_id: userId,
      title: 'Cooling Tower Blowdown Continuous Solenoid Weeping',
      category: 'water_plumbing',
      severity: 'HIGH',
      impact_description: 'Submeter flow rates fail to return to zero baseline between 01:00 AM and 05:00 AM, losing approximately 280 Liters/hr continually.',
      remediation_steps: [
        'Replace worn rubber diaphragm seal on main cooling tower solenoid valve.',
        'Calibrate automatic conductivity sensor to optimize blowdown cycles.',
        'Verify zero flow via ultrasonic clamp meter during Sunday shutdown.'
      ],
      est_cost_savings_usd: 12400,
      est_carbon_reduction_kg: 4800,
      status: 'PENDING',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: uuidv4(),
      assessment_id: assessmentId,
      user_id: userId,
      title: 'Packaging & Corrugated Cardboard Contamination',
      category: 'waste_management',
      severity: 'MEDIUM',
      impact_description: 'Loading dock audits show clean cardboard compacted with wet trash, forfeiting clean baling rebates and inflating hauling tipping fees.',
      remediation_steps: [
        'Deploy dedicated cardboard baler in Dock Bay #2.',
        'Conduct 15-minute janitorial training on wet/dry sorting protocol.',
        'Contract dedicated weekly cardboard reclamation pickup.'
      ],
      est_cost_savings_usd: 8900,
      est_carbon_reduction_kg: 24500,
      status: 'IN_PROGRESS',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: uuidv4(),
      assessment_id: assessmentId,
      user_id: userId,
      title: 'Coincident Peak Demand Spike Mitigation (15:00 - 17:30)',
      category: 'energy_hvac',
      severity: 'LOW',
      impact_description: 'Simultaneous EV charging cluster and HVAC chiller demand elevates billed utility peak demand charge by 18%.',
      remediation_steps: [
        'Enable pre-cooling routine starting at 13:30 to float indoor temp during peak rate window.',
        'Stagger Level 2 fleet EV chargers through smart load sharing BMS integration.'
      ],
      est_cost_savings_usd: 14200,
      est_carbon_reduction_kg: 19800,
      status: 'RESOLVED',
      created_at: new Date(Date.now() - 7200000).toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  memoryStore.actionItems.set(userId, items);
}

// Pre-seed demo user right away
seedDefaultFacility('demo-facility-user');

export const db = {
  async getProfile(userId) {
    if (supabase) {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (!error && data) return data;
    }
    if (!memoryStore.profiles.has(userId)) {
      seedDefaultFacility(userId);
    }
    return memoryStore.profiles.get(userId);
  },

  async saveProfile(userId, profileData) {
    const profile = {
      id: userId,
      facility_name: profileData.facility_name,
      facility_type: profileData.facility_type,
      square_footage: Number(profileData.square_footage),
      operating_hours: profileData.operating_hours,
      target_goals: profileData.target_goals || [],
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    };

    if (supabase) {
      try {
        await supabase.from('profiles').upsert(profile);
      } catch (e) {
        console.warn('Supabase upsert profile error:', e.message);
      }
    }

    memoryStore.profiles.set(userId, profile);
    return profile;
  },

  async getTelemetry(userId, options = {}) {
    const { resourceType, limit = 500 } = options;

    if (supabase) {
      try {
        let query = supabase.from('telemetry').select('*').eq('user_id', userId).order('recorded_at', { ascending: true });
        if (resourceType) query = query.eq('resource_type', resourceType);
        if (limit) query = query.limit(limit);
        const { data, error } = await query;
        if (!error && data && data.length) return data;
      } catch (e) {
        console.warn('Supabase get telemetry error:', e.message);
      }
    }

    if (!memoryStore.telemetry.has(userId)) {
      seedDefaultFacility(userId);
    }
    let list = memoryStore.telemetry.get(userId) || [];
    if (resourceType) {
      list = list.filter(item => item.resource_type === resourceType);
    }
    return list.slice(-limit);
  },

  async insertTelemetryBatch(userId, items) {
    const formatted = items.map(item => ({
      id: uuidv4(),
      user_id: userId,
      resource_type: item.resource_type,
      metric_value: Number(item.metric_value),
      metric_unit: item.metric_unit,
      recorded_at: item.recorded_at || new Date().toISOString(),
      metadata: item.metadata || {}
    }));

    if (supabase) {
      try {
        await supabase.from('telemetry').insert(formatted);
      } catch (e) {
        console.warn('Supabase insert telemetry error:', e.message);
      }
    }

    const current = memoryStore.telemetry.get(userId) || [];
    memoryStore.telemetry.set(userId, [...current, ...formatted]);
    return formatted;
  },

  async getLatestAssessment(userId) {
    if (supabase) {
      try {
        const { data: assessment } = await supabase
          .from('assessments')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (assessment) {
          const { data: items } = await supabase
            .from('action_items')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

          return {
            assessment,
            action_items: items || []
          };
        }
      } catch (e) {
        console.warn('Supabase get assessment error:', e.message);
      }
    }

    if (!memoryStore.assessments.has(userId)) {
      seedDefaultFacility(userId);
    }

    return {
      assessment: memoryStore.assessments.get(userId),
      action_items: memoryStore.actionItems.get(userId) || []
    };
  },

  async saveAssessment(userId, assessmentData, anomalies) {
    const assessmentId = uuidv4();
    const assessment = {
      id: assessmentId,
      user_id: userId,
      ecopulse_score: Math.min(100, Math.max(0, assessmentData.ecopulse_score)),
      summary: assessmentData.summary,
      created_at: new Date().toISOString()
    };

    const actionItems = anomalies.map(a => ({
      id: uuidv4(),
      assessment_id: assessmentId,
      user_id: userId,
      title: a.title,
      category: a.category,
      severity: a.severity,
      impact_description: a.impact_description,
      remediation_steps: Array.isArray(a.remediation_steps) ? a.remediation_steps : [a.remediation_steps],
      est_cost_savings_usd: Number(a.est_cost_savings_usd || 0),
      est_carbon_reduction_kg: Number(a.est_carbon_reduction_kg || 0),
      status: 'PENDING',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    if (supabase) {
      try {
        await supabase.from('assessments').insert(assessment);
        await supabase.from('action_items').insert(actionItems);
      } catch (e) {
        console.warn('Supabase save assessment error:', e.message);
      }
    }

    memoryStore.assessments.set(userId, assessment);
    memoryStore.actionItems.set(userId, actionItems);

    return { assessment, action_items: actionItems };
  },

  async updateActionItemStatus(userId, itemId, status) {
    let updatedItem = null;
    let items = memoryStore.actionItems.get(userId) || [];

    for (let item of items) {
      if (item.id === itemId) {
        item.status = status;
        item.updated_at = new Date().toISOString();
        updatedItem = item;
        break;
      }
    }

    if (supabase) {
      try {
        const { data } = await supabase
          .from('action_items')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('id', itemId)
          .eq('user_id', userId)
          .select()
          .single();
        if (data) updatedItem = data;
      } catch (e) {
        console.warn('Supabase update status error:', e.message);
      }
    }

    // Dynamic Score Recalculation:
    // Resolving items increases the EcoPulse score dynamically!
    const allItems = memoryStore.actionItems.get(userId) || [];
    const resolvedCount = allItems.filter(i => i.status === 'RESOLVED').length;
    const inProgressCount = allItems.filter(i => i.status === 'IN_PROGRESS').length;
    const totalCount = allItems.length || 1;

    const baseScore = 65;
    const bonus = Math.round((resolvedCount / totalCount) * 30 + (inProgressCount / totalCount) * 10);
    const newScore = Math.min(98, baseScore + bonus);

    let currentAssessment = memoryStore.assessments.get(userId);
    if (currentAssessment) {
      currentAssessment.ecopulse_score = newScore;
      memoryStore.assessments.set(userId, currentAssessment);

      if (supabase) {
        try {
          await supabase.from('assessments').update({ ecopulse_score: newScore }).eq('id', currentAssessment.id);
        } catch (e) {}
      }
    }

    return {
      item: updatedItem,
      new_score: newScore,
      resolved_count: resolvedCount,
      total_count: totalCount
    };
  },

  async getSustainabilityReport(userId) {
    const profile = await this.getProfile(userId);
    const { assessment, action_items } = await this.getLatestAssessment(userId);
    const telemetry = await this.getTelemetry(userId, { limit: 168 });

    const totalPotentialSavingsUsd = action_items.reduce((acc, i) => acc + Number(i.est_cost_savings_usd || 0), 0);
    const totalCarbonReductionKg = action_items.reduce((acc, i) => acc + Number(i.est_carbon_reduction_kg || 0), 0);
    
    const realizedSavingsUsd = action_items
      .filter(i => i.status === 'RESOLVED')
      .reduce((acc, i) => acc + Number(i.est_cost_savings_usd || 0), 0);

    const realizedCarbonKg = action_items
      .filter(i => i.status === 'RESOLVED')
      .reduce((acc, i) => acc + Number(i.est_carbon_reduction_kg || 0), 0);

    return {
      facility: profile,
      ecopulse_score: assessment?.ecopulse_score || 72,
      summary: assessment?.summary || '',
      metrics: {
        total_potential_savings_usd: totalPotentialSavingsUsd,
        total_potential_carbon_kg: totalCarbonReductionKg,
        realized_savings_usd: realizedSavingsUsd,
        realized_carbon_kg: realizedCarbonKg,
        trees_offset_equivalent: Math.round(realizedCarbonKg / 21.7), // EPA: ~21.7kg CO2 per tree/yr
        resolved_actions_count: action_items.filter(i => i.status === 'RESOLVED').length,
        pending_actions_count: action_items.filter(i => i.status === 'PENDING').length,
        in_progress_actions_count: action_items.filter(i => i.status === 'IN_PROGRESS').length,
        total_actions_count: action_items.length
      },
      action_items,
      domain_breakdown: {
        energy_hvac: {
          items_count: action_items.filter(i => i.category === 'energy_hvac').length,
          potential_savings_usd: action_items.filter(i => i.category === 'energy_hvac').reduce((a, b) => a + Number(b.est_cost_savings_usd), 0)
        },
        water_plumbing: {
          items_count: action_items.filter(i => i.category === 'water_plumbing').length,
          potential_savings_usd: action_items.filter(i => i.category === 'water_plumbing').reduce((a, b) => a + Number(b.est_cost_savings_usd), 0)
        },
        waste_management: {
          items_count: action_items.filter(i => i.category === 'waste_management').length,
          potential_savings_usd: action_items.filter(i => i.category === 'waste_management').reduce((a, b) => a + Number(b.est_cost_savings_usd), 0)
        }
      },
      telemetry_summary: {
        total_data_points: telemetry.length,
        latest_reading_time: telemetry[telemetry.length - 1]?.recorded_at
      }
    };
  }
};
