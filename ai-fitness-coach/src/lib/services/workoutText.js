export const formatWorkoutForSpeech = (workout) => {
  let text = `You have ${workout.frequency_per_week} workouts per week. Each session around ${workout.session_duration_minutes} minutes.`;

  Object.entries(workout.weekly_schedule).forEach(([_, data], index) => {
    text += ` Day ${index + 1} focuses on ${data.focus}.`;
    data?.exercises?.forEach((ex) => {
      text += ` ${ex.name}.`;
      if (ex.sets > 0) text += ` ${ex.sets} sets.`;
      if (ex.reps > 0) text += ` ${ex.reps} repetitions.`;
      if (ex.duration) text += ` Duration ${ex.duration}.`;
    });
  });

  return text;
};
