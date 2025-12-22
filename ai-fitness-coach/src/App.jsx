import React, { useEffect, useState } from "react";
import FitnessForm from "./components/app/FitnessForm";
import { generatePrompt } from "./lib/services/prompt";
import { generatePlan } from "./lib/services/generatedplan";
import { getPlan, savePlan } from "./lib/services/storage";
import DisplayPlan from "./components/app/DIsplayPlan";

function App() {
  const [plan, setPlan] = useState(null);

  const handleSubmit = async (data) => {
    const prompt = generatePrompt(data);
    const plan = await generatePlan(prompt);
    const textPlan = plan?.candidates?.[0]?.content?.parts?.[0]?.text;
    const cleanedText = textPlan
      ?.replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    // Find first { and last }
    const start = cleanedText.indexOf("{");
    const end = cleanedText.lastIndexOf("}");

    if (start === -1 || end === -1) return null;

    const jsonString = cleanedText.substring(start, end + 1);
    const finalPlan = JSON.parse(jsonString);
    setPlan(finalPlan);
    savePlan(finalPlan);
  };

  useEffect(() => {
    const loadPlan = () => {
      const savedPlan = getPlan();
      if (savedPlan) setPlan(savedPlan);
    };

    loadPlan();
  }, []);

  return (
    <main className="relative min-h-screen">
      <img
        src="/fitness_background.jpg"
        alt="Background image"
        className="absolute object-cover w-full h-full -z-10 opacity-85"
      />
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <FitnessForm onSubmit={handleSubmit} />
        {plan && <DisplayPlan plan={plan} />}
      </div>
    </main>
  );
}

export default App;
