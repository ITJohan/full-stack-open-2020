export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeaveEntry {
  startDate: string;
  endDate: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeaveEntry;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: Discharge;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
};

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
};

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
};

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<Patient, 'id'>;
export type NewEntry = Omit<Entry, 'id'>;