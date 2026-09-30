import { z } from 'zod';

export const OnboardingSchema = z.object({
  facility_name: z.string().min(2, "Facility name required (at least 2 characters)"),
  facility_type: z.string().min(2, "Facility type required"),
  square_footage: z.coerce.number().positive("Square footage must be a positive number"),
  operating_hours: z.string().min(1, "Operating hours required"),
  target_goals: z.array(z.string()).optional()
});

export const TelemetryIngestSchema = z.object({
  telemetry: z.array(z.object({
    resource_type: z.enum(['energy_hvac', 'water_plumbing', 'waste_management']),
    metric_value: z.coerce.number().nonnegative("Metric value must be non-negative"),
    metric_unit: z.string().min(1, "Metric unit required"),
    recorded_at: z.string().optional(),
    metadata: z.record(z.any()).optional()
  })).min(1, "At least one reading required")
});

export const UpdateStatusSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'RESOLVED'])
});

export const GenerateAssessmentSchema = z.object({
  timeRange: z.string().optional()
});
