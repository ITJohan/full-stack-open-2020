import { v4 as uuid } from 'uuid';
import patients from '../../data/patients';
import {PatientEntry, NonSensitivePatientEntry, NewPatientEntry} from '../types';

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }))
}

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};