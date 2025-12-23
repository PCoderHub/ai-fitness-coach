export const formatDietForSpeech = (diet) => {
  if (!diet) return "";

  let text = `Your daily calorie focus is `;
  text += `${diet.daily_calorie_focus}. `;

  const mealsOrder = ["breakfast", "lunch", "dinner", "snacks"];

  mealsOrder.forEach((meal) => {
    const options = diet.meal_plan?.[meal];
    if (!options || options.length === 0) return;

    text += `For ${meal}, you can choose from the following. `;

    options.forEach((item, index) => {
      text += `Option ${index + 1}. ${item}. `;
    });
  });

  text += `Remember to stay hydrated and maintain consistent meal timings.`;

  return text;
};
