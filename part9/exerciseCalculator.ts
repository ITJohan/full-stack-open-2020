interface Report {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (hours: Array<number>): Report => {
  const target = 2;
  const sum = 
    hours.reduce((sum: number, current: number): number => sum += current);
  const average = sum / hours.length;

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((hour: number): boolean => hour !== 0).length,
    success: average >= target,
    rating: average < target ? 1 : average === target ? 2 : 3,
    ratingDescription: average < target ? 'bad' : average === target ? 'ok' : 'good',
    target,
    average
  };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));