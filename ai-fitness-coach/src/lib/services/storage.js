export const getPlanCacheKey = (formData) => {
  return `fitness_plan_${JSON.stringify(formData)}`;
};

export const savePlan = (key, plan) => {
  localStorage.setItem(key, JSON.stringify({ plan }));
};

export const getPlan = (key) => {
  const planData = localStorage.getItem(key);
  if (!planData) return null;

  const { plan } = JSON.parse(planData);
  return plan;
};
