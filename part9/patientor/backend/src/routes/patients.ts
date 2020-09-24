import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('getting patients');
  res.send(patientService.getNonSensitiveEntries());
});

export default router;