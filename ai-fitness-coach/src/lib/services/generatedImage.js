export const generateImage = ({ prompt }) => {
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    prompt
  )}?width=1024&height=1024&seed=42`;

  return { image: imageUrl };
};

//https://image.pollinations.ai/prompt/High-quality%20professional%20food%20photography.Healthy%20Baked%20salmon%20(100-120g)%20with%20a%20generous%20portion%20of%20steamed%20broccoli%20and%20a%20small%20serving%20of%20brown%20rice.Fresh%20ingredients.Realistic%20textures%20and%20colors.Served%20on%20a%20clean%20plate.Top-down%20or%2045-degree%20angle.Natural%20lighting.Minimal%20background.No%20people.No%20text.No%20watermark.?width=1024&height=1024&seed=42
