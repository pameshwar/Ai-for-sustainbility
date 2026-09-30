-- EcoPulse AI - Supabase PostgreSQL Schema with RLS
-- Run this in your Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    facility_name TEXT NOT NULL,
    facility_type TEXT NOT NULL,
    square_footage NUMERIC NOT NULL,
    operating_hours TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Resource Telemetry Table
CREATE TABLE IF NOT EXISTS public.telemetry (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    resource_type TEXT NOT NULL CHECK (resource_type IN ('energy_hvac', 'water_plumbing', 'waste_management')),
    metric_value NUMERIC NOT NULL,
    metric_unit TEXT NOT NULL,
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 3. Sustainability Assessments Table
CREATE TABLE IF NOT EXISTS public.assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    ecopulse_score INT NOT NULL CHECK (ecopulse_score BETWEEN 0 AND 100),
    summary TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Anomaly & Recommendation Items Table
CREATE TABLE IF NOT EXISTS public.action_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('energy_hvac', 'water_plumbing', 'waste_management')),
    severity TEXT NOT NULL CHECK (severity IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')),
    impact_description TEXT NOT NULL,
    remediation_steps TEXT[] NOT NULL,
    est_cost_savings_usd NUMERIC NOT NULL,
    est_carbon_reduction_kg NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'IN_PROGRESS', 'RESOLVED')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telemetry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.action_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Profiles
DROP POLICY IF EXISTS "Users can manage their own facility profile" ON public.profiles;
CREATE POLICY "Users can manage their own facility profile" 
ON public.profiles FOR ALL USING (auth.uid() = id);

-- RLS Policies for Telemetry
DROP POLICY IF EXISTS "Users can manage their own facility telemetry" ON public.telemetry;
CREATE POLICY "Users can manage their own facility telemetry" 
ON public.telemetry FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for Assessments
DROP POLICY IF EXISTS "Users can view their own assessments" ON public.assessments;
CREATE POLICY "Users can view their own assessments" 
ON public.assessments FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for Action Items
DROP POLICY IF EXISTS "Users can manage their own action items" ON public.action_items;
CREATE POLICY "Users can manage their own action items" 
ON public.action_items FOR ALL USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_telemetry_user_resource ON public.telemetry(user_id, resource_type, recorded_at);
CREATE INDEX IF NOT EXISTS idx_assessments_user_created ON public.assessments(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_action_items_user_status ON public.action_items(user_id, status);
