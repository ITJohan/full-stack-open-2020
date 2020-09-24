import diagnoses from '../../data/diagnoses';
import {DiagnoseEntry} from '../types'; 

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

export default {
  getEntries
};