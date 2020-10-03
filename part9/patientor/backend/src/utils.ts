/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from './types';

const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseString(object.name),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: []
  };
}

const parseString = (param: any): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing param: ' + param);
  }

  return param;
}

const parseGender = (param: any): Gender => {
  if (!param || !isGender(param)) {
    throw new Error('Incorrect or missing gender: ' + param);
  }

  return param;
};

const isString = (param: any): param is string => {
  return typeof param === 'string' || param instanceof String;
}

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
}

export default toNewPatientEntry;