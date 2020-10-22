import { v4 as uuid } from 'uuid';
import patients from '../../data/patients';
import {Patient, NonSensitivePatientEntry, NewPatientEntry, Entry} from '../types';

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }))
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
}


const addEntry = (entry: Entry, patientId: string): Patient | undefined => {
  const patient = patients.find(p => p.id === patientId);

  patient?.entries.push({ ...entry, id: uuid() });
  return patient;
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatient,
  addEntry
};