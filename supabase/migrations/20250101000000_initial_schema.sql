-- Migration file for Supabase
-- Generated automatically from template models
-- Run this in the Supabase SQL Editor or as a migration

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if needed (commented out by default)
-- Uncomment these lines to drop tables before creation
-- DROP TABLE IF EXISTS "prescriptions" CASCADE;
-- DROP TABLE IF EXISTS "medical_records" CASCADE;
-- DROP TABLE IF EXISTS "appointments" CASCADE;
-- DROP TABLE IF EXISTS "providers" CASCADE;
-- DROP TABLE IF EXISTS "patients" CASCADE;

-- Create all tables (without foreign keys)
CREATE TABLE IF NOT EXISTS "patients" (
  "id" TEXT NOT NULL UNIQUE PRIMARY KEY,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "dateOfBirth" TIMESTAMP WITH TIME ZONE NOT NULL,
  "gender" TEXT,
  "email" TEXT UNIQUE,
  "phone" TEXT,
  "address" JSONB,
  "healthId" TEXT UNIQUE,
  "bloodType" TEXT,
  "allergies" TEXT[] DEFAULT '{}',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "providers" (
  "id" TEXT NOT NULL UNIQUE PRIMARY KEY,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "specialization" TEXT NOT NULL,
  "licenseNumber" TEXT NOT NULL UNIQUE,
  "email" TEXT NOT NULL UNIQUE,
  "phone" TEXT,
  "availability" JSONB,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "appointments" (
  "id" TEXT NOT NULL UNIQUE PRIMARY KEY,
  "patientId" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "appointmentDate" TIMESTAMP WITH TIME ZONE NOT NULL,
  "duration" NUMERIC DEFAULT 30,
  "status" TEXT NOT NULL DEFAULT 'scheduled',
  "type" TEXT NOT NULL,
  "notes" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "medical_records" (
  "id" TEXT NOT NULL UNIQUE PRIMARY KEY,
  "patientId" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "appointmentId" TEXT,
  "date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "diagnosis" TEXT,
  "symptoms" TEXT[],
  "vitals" JSONB,
  "notes" TEXT,
  "attachments" TEXT[] DEFAULT '{}',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "prescriptions" (
  "id" TEXT NOT NULL UNIQUE PRIMARY KEY,
  "patientId" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "medicalRecordId" TEXT,
  "medication" TEXT NOT NULL,
  "dosage" TEXT NOT NULL,
  "frequency" TEXT NOT NULL,
  "duration" TEXT,
  "instructions" TEXT,
  "refills" NUMERIC DEFAULT 0,
  "status" TEXT DEFAULT 'active',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "expiresAt" TIMESTAMP WITH TIME ZONE
);

-- Add foreign key constraints (with IF NOT EXISTS where possible)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_appointments_patientId_patients'
    ) THEN
        ALTER TABLE "appointments" ADD CONSTRAINT fk_appointments_patientId_patients
        FOREIGN KEY ("patientId") REFERENCES "patients"(id);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_appointments_providerId_providers'
    ) THEN
        ALTER TABLE "appointments" ADD CONSTRAINT fk_appointments_providerId_providers
        FOREIGN KEY ("providerId") REFERENCES "providers"(id);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_medical_records_patientId_patients'
    ) THEN
        ALTER TABLE "medical_records" ADD CONSTRAINT fk_medical_records_patientId_patients
        FOREIGN KEY ("patientId") REFERENCES "patients"(id);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_medical_records_providerId_providers'
    ) THEN
        ALTER TABLE "medical_records" ADD CONSTRAINT fk_medical_records_providerId_providers
        FOREIGN KEY ("providerId") REFERENCES "providers"(id);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_prescriptions_patientId_patients'
    ) THEN
        ALTER TABLE "prescriptions" ADD CONSTRAINT fk_prescriptions_patientId_patients
        FOREIGN KEY ("patientId") REFERENCES "patients"(id);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_prescriptions_providerId_providers'
    ) THEN
        ALTER TABLE "prescriptions" ADD CONSTRAINT fk_prescriptions_providerId_providers
        FOREIGN KEY ("providerId") REFERENCES "providers"(id);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_prescriptions_medicalRecordId_medical_records'
    ) THEN
        ALTER TABLE "prescriptions" ADD CONSTRAINT fk_prescriptions_medicalRecordId_medical_records
        FOREIGN KEY ("medicalRecordId") REFERENCES "medical_records"(id);
    END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_patients_lastName_firstName
  ON "patients" ("lastName", "firstName");

CREATE UNIQUE INDEX IF NOT EXISTS idx_patients_healthId
  ON "patients" ("healthId");

CREATE UNIQUE INDEX IF NOT EXISTS idx_patients_email
  ON "patients" ("email");

CREATE UNIQUE INDEX IF NOT EXISTS idx_providers_licenseNumber
  ON "providers" ("licenseNumber");

CREATE INDEX IF NOT EXISTS idx_providers_specialization
  ON "providers" ("specialization");

CREATE INDEX IF NOT EXISTS idx_appointments_patientId_appointmentDate
  ON "appointments" ("patientId", "appointmentDate");

CREATE INDEX IF NOT EXISTS idx_appointments_providerId_appointmentDate
  ON "appointments" ("providerId", "appointmentDate");

CREATE INDEX IF NOT EXISTS idx_appointments_status
  ON "appointments" ("status");

CREATE INDEX IF NOT EXISTS idx_medical_records_patientId_date
  ON "medical_records" ("patientId", "date");

CREATE INDEX IF NOT EXISTS idx_medical_records_providerId
  ON "medical_records" ("providerId");

CREATE INDEX IF NOT EXISTS idx_prescriptions_patientId_status
  ON "prescriptions" ("patientId", "status");

CREATE INDEX IF NOT EXISTS idx_prescriptions_providerId
  ON "prescriptions" ("providerId");

-- Row Level Security
-- Uncomment and modify these RLS policies as needed

-- Enable RLS on "patients"
-- ALTER TABLE "patients" ENABLE ROW LEVEL SECURITY;

-- Example policy for authenticated users
-- CREATE POLICY "Users can see their own data" ON "patients"
--   FOR SELECT USING (auth.uid() = user_id);

-- Enable RLS on "providers"
-- ALTER TABLE "providers" ENABLE ROW LEVEL SECURITY;

-- Example policy for authenticated users
-- CREATE POLICY "Users can see their own data" ON "providers"
--   FOR SELECT USING (auth.uid() = user_id);

-- Enable RLS on "appointments"
-- ALTER TABLE "appointments" ENABLE ROW LEVEL SECURITY;

-- Example policy for authenticated users
-- CREATE POLICY "Users can see their own data" ON "appointments"
--   FOR SELECT USING (auth.uid() = user_id);

-- Enable RLS on "medical_records"
-- ALTER TABLE "medical_records" ENABLE ROW LEVEL SECURITY;

-- Example policy for authenticated users
-- CREATE POLICY "Users can see their own data" ON "medical_records"
--   FOR SELECT USING (auth.uid() = user_id);

-- Enable RLS on "prescriptions"
-- ALTER TABLE "prescriptions" ENABLE ROW LEVEL SECURITY;

-- Example policy for authenticated users
-- CREATE POLICY "Users can see their own data" ON "prescriptions"
--   FOR SELECT USING (auth.uid() = user_id);

