export const generateVoice = async (text) => {
  const res = await fetch(
    "https://api.elevenlabs.io/v1/text-to-speech/sB1b5zUrxQVAFl2PhZFp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
      }),
    }
  );

  if (!res.ok) throw new Error("Voice generation failed");

  return await res.blob();
};
