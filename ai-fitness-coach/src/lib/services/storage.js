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

export const getVoiceCacheKey = (text) => `tts_${btoa(text).slice(0, 100)}`;

export const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

export const getCachedVoice = (key) => {
  return localStorage.getItem(key);
};

export const saveVoice = (key, audioUrl) => {
  localStorage.setItem(key, audioUrl);
};

export const getCachedImage = (exercise) => {
  return localStorage.getItem(`exercise-img-${exercise}`);
};

export const saveCachedImage = (exercise, url) => {
  localStorage.setItem(`exercise-img-${exercise}`, url);
};
