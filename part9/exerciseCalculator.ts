interface Report {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ExerciseArguments {
  target: number,
  hours: Array<number>
}

const parseExerciseArguments = (args: Array<string>): ExerciseArguments => {
  const filteredArgs = 
    args
      .filter(arg => !isNaN(Number(arg)))
      .map(arg => Number(arg));

  if (filteredArgs.length < 2) throw new Error('Too few arguments');

  const target = filteredArgs[0];
  const hours = filteredArgs.splice(1, filteredArgs.length);

  return {
    target,
    hours
  };
};

const calculateExercises = (target: number, hours: Array<number>): Report => {
  const sum = 
    hours.reduce((sum, current) => sum += current);
  const average = sum / hours.length;

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((hour) => hour !== 0).length,
    success: average >= target,
    rating: average < target ? 1 : average === target ? 2 : 3,
    ratingDescription: average < target ? 'bad' : average === target ? 'ok' : 'good',
    target,
    average
  };
};

try {
  const {target, hours} = parseExerciseArguments(process.argv);
  console.log(calculateExercises(target, hours));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message); // eslint-disable-line
}
