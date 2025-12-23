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

// export const getTTSKey = (text) =>
//   `tts_${btoa(text.substring(0, 100))}`;

// export const getCachedTTS = (key) => {
//   return localStorage.getItem(key);
// };

// export const saveTTS = (key, audioUrl) => {
//   localStorage.setItem(key, audioUrl);
// };

export const getCachedImage = (exercise) => {
  return localStorage.getItem(`exercise-img-${exercise}`);
};

export const saveCachedImage = (exercise, url) => {
  localStorage.setItem(`exercise-img-${exercise}`, url);
};
