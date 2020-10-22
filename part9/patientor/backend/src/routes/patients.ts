import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  res.json(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.post('/:id/entries', (req, res) => {
  const { description, date, specialist, type } = req.body;

  if (!description || !date || !specialist || !type) {
    res.status(400).json({error: 'Missing params'}).end();
  }

  switch (type) {
    case 'HealthCheck':
      const { healthCheckRating } = req.body;
      if (!healthCheckRating) {
        res.status(400).json({error: 'Missing health check rating'}).end();
      }
      break;
    case 'OccupationalHealthcare':
      const { employerName } = req.body;
      if (!employerName) {
        res.status(400).json({error: 'Missing emplyer name'}).end();
      }
      break;
    default:
      break;
  }
  
  const addedEntry = patientService.addEntry(req.body, req.params.id);
  res.json(addedEntry);
})

export default router;