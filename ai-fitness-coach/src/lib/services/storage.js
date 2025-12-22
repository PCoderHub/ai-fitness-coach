export const savePlan = (plan) => {
  localStorage.setItem("fitness_plan", JSON.stringify(plan));
};

export const getPlan = () => {
  const planData = localStorage.getItem("fitness_plan");
  return planData ? JSON.parse(planData) : null;
};
