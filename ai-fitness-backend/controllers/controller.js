// const generateImage = async (req, res) => {
//   const { exercise } = req.body;

//   if (!exercise) {
//     return res.status(400).json({ error: "Exercise is required" });
//   }

//   try {
//     // 1️⃣ Create prediction
//     const createResponse = await fetch(
//       "https://api.replicate.com/v1/models/google/nano-banana-pro/predictions",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.REPLICATE_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           input: {
//             prompt: `A realistic fitness exercise demonstration photo of a person performing the "${exercise}" exercise.
// The person demonstrates correct posture and form.
// Full body visible, neutral indoor gym background, athletic clothing, professional fitness photography.
// `,
//           },
//         }),
//       }
//     );

//     const prediction = await createResponse.json();

//     if (!prediction.id) {
//       console.error(prediction);
//       throw new Error("Failed to start prediction");
//     }

//     // 2️⃣ Poll
//     let status = prediction.status;
//     let output = null;

//     while (status !== "succeeded" && status !== "failed") {
//       await new Promise((r) => setTimeout(r, 1500));

//       const pollRes = await fetch(
//         `https://api.replicate.com/v1/predictions/${prediction.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.REPLICATE_API_KEY}`,
//           },
//         }
//       );

//       const pollData = await pollRes.json();
//       status = pollData.status;
//       output = pollData.output;
//     }

//     if (status === "failed") {
//       throw new Error("Prediction failed");
//     }

//     // ✅ FIX: Handle string OR array
//     let imageUrl = null;

//     if (Array.isArray(output)) {
//       imageUrl = output[0];
//     } else if (typeof output === "string") {
//       imageUrl = output;
//     }

//     if (!imageUrl) {
//       console.error("Invalid output:", output);
//       throw new Error("Invalid image output");
//     }

//     res.json({ image: imageUrl });
//   } catch (error) {
//     console.error("Image generation error:", error);
//     res.status(500).json({ error: "Failed to generate image" });
//   }
// }

const generateImage = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    prompt
  )}?width=1024&height=1024&seed=42`;

  res.json({ image: imageUrl });
};

module.exports = {
  generateImage,
};
