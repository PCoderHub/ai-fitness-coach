export const generateImage = async ({ prompt }) => {
  const res = await fetch("http://localhost:3000/api/generate-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) throw new Error("Failed to generate image");

  return res.json();
};
