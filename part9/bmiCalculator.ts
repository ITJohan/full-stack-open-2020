interface BmiArguments {
  height: number,
  weight: number
}

const parseBmiArguments = (args: Array<string>): BmiArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
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

  return msg;
};

try {
  const {height, weight} = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message); // eslint-disable-line
}