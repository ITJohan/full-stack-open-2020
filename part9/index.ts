import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    return res.status(404).json({error: 'malformatted parameters'});
  }

  const bmi = calculateBmi(height, weight);

  return res.status(200).json({weight, height, bmi});
});

app.post('/exercises', (req, res) => {
  let hours = req.body.daily_exercises; // eslint-disable-line
  let target = req.body.target; // eslint-disable-line

  if (!hours || !target) {
    return res.status(404).json({error: 'parameters missing'});
  }

  if (!Array.isArray(hours) || !Number(target)) {
    return res.status(404).json({error: 'malformatted parameters'});
  }

  hours = hours.filter(hour => !isNaN(hour)); 
  target = Number(target);

  return res.status(200).json(calculateExercises(target, hours));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log('Server listening on port: ', PORT);
});
