const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height/100)**2;
  let msg = '';

  if (bmi < 15) msg = 'Very severely underweight';
  else if (bmi < 16) msg = 'Severly underweight';
  else if (bmi < 18.5) msg = 'Underweight';
  else if (bmi < 25) msg = 'Normal (healthy weight)';
  else if (bmi < 30) msg = 'Overweight';
  else if (bmi < 35) msg = 'Obese Class I (Moderately obese)';
  else if (bmi < 40) msg = 'Obese Class II (Severely obese)';
  else msg = 'Obese Class III (Very severely obese)';

  return msg
}

console.log(calculateBmi(180, 74));