// Generated TypeScript type definitions for Supabase tables
// This file should not be edited manually

/**
 * Database schema type definitions
 */
export type Database = {
  patients: {
    Row: {
      id: string;
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      gender?: string;
      email?: string;
      phone?: string;
      address?: Record<string, any>;
      healthId?: string;
      bloodType?: string;
      allergies?: string[];
      createdAt?: string;
      updatedAt?: string;
    };
    Insert: {
      id?: string;
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      gender?: string;
      email?: string;
      phone?: string;
      address?: Record<string, any>;
      healthId?: string;
      bloodType?: string;
      allergies?: string[];
      createdAt?: string;
      updatedAt?: string;
    };
    Update: {
      id?: string;
      firstName?: string;
      lastName?: string;
      dateOfBirth?: string;
      gender?: string;
      email?: string;
      phone?: string;
      address?: Record<string, any>;
      healthId?: string;
      bloodType?: string;
      allergies?: string[];
      createdAt?: string;
      updatedAt?: string;
    };
  };
  providers: {
    Row: {
      id: string;
      firstName: string;
      lastName: string;
      specialization: string;
      licenseNumber: string;
      email: string;
      phone?: string;
      availability?: Record<string, any>;
      createdAt?: string;
    };
    Insert: {
      id?: string;
      firstName: string;
      lastName: string;
      specialization: string;
      licenseNumber: string;
      email: string;
      phone?: string;
      availability?: Record<string, any>;
      createdAt?: string;
    };
    Update: {
      id?: string;
      firstName?: string;
      lastName?: string;
      specialization?: string;
      licenseNumber?: string;
      email?: string;
      phone?: string;
      availability?: Record<string, any>;
      createdAt?: string;
    };
  };
  appointments: {
    Row: {
      id: string;
      patientId: string;
      providerId: string;
      appointmentDate: string;
      duration?: number;
      status: string;
      type: string;
      notes?: string;
      createdAt?: string;
      updatedAt?: string;
    };
    Insert: {
      id?: string;
      patientId: string;
      providerId: string;
      appointmentDate: string;
      duration?: number;
      status?: string;
      type: string;
      notes?: string;
      createdAt?: string;
      updatedAt?: string;
    };
    Update: {
      id?: string;
      patientId?: string;
      providerId?: string;
      appointmentDate?: string;
      duration?: number;
      status?: string;
      type?: string;
      notes?: string;
      createdAt?: string;
      updatedAt?: string;
    };
  };
  medical_records: {
    Row: {
      id: string;
      patientId: string;
      providerId: string;
      appointmentId?: string;
      date: string;
      diagnosis?: string;
      symptoms?: string[];
      vitals?: Record<string, any>;
      notes?: string;
      attachments?: string[];
      createdAt?: string;
    };
    Insert: {
      id?: string;
      patientId: string;
      providerId: string;
      appointmentId?: string;
      date: string;
      diagnosis?: string;
      symptoms?: string[];
      vitals?: Record<string, any>;
      notes?: string;
      attachments?: string[];
      createdAt?: string;
    };
    Update: {
      id?: string;
      patientId?: string;
      providerId?: string;
      appointmentId?: string;
      date?: string;
      diagnosis?: string;
      symptoms?: string[];
      vitals?: Record<string, any>;
      notes?: string;
      attachments?: string[];
      createdAt?: string;
    };
  };
  prescriptions: {
    Row: {
      id: string;
      patientId: string;
      providerId: string;
      medicalRecordId?: string;
      medication: string;
      dosage: string;
      frequency: string;
      duration?: string;
      instructions?: string;
      refills?: number;
      status?: string;
      createdAt?: string;
      expiresAt?: string;
    };
    Insert: {
      id?: string;
      patientId: string;
      providerId: string;
      medicalRecordId?: string;
      medication: string;
      dosage: string;
      frequency: string;
      duration?: string;
      instructions?: string;
      refills?: number;
      status?: string;
      createdAt?: string;
      expiresAt?: string;
    };
    Update: {
      id?: string;
      patientId?: string;
      providerId?: string;
      medicalRecordId?: string;
      medication?: string;
      dosage?: string;
      frequency?: string;
      duration?: string;
      instructions?: string;
      refills?: number;
      status?: string;
      createdAt?: string;
      expiresAt?: string;
    };
  };
};

// Helper types for accessing tables
export type Tables<T extends keyof Database> = Database[T]['Row'];
export type InsertTables<T extends keyof Database> = Database[T]['Insert'];
export type UpdateTables<T extends keyof Database> = Database[T]['Update'];

// Individual table types
export type Patient = Tables<'patients'>;
export type PatientInsert = InsertTables<'patients'>;
export type PatientUpdate = UpdateTables<'patients'>;

export type Provider = Tables<'providers'>;
export type ProviderInsert = InsertTables<'providers'>;
export type ProviderUpdate = UpdateTables<'providers'>;

export type Appointment = Tables<'appointments'>;
export type AppointmentInsert = InsertTables<'appointments'>;
export type AppointmentUpdate = UpdateTables<'appointments'>;

export type MedicalRecord = Tables<'medical_records'>;
export type MedicalRecordInsert = InsertTables<'medical_records'>;
export type MedicalRecordUpdate = UpdateTables<'medical_records'>;

export type Prescription = Tables<'prescriptions'>;
export type PrescriptionInsert = InsertTables<'prescriptions'>;
export type PrescriptionUpdate = UpdateTables<'prescriptions'>;

