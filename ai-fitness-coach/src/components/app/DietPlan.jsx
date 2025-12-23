import { useState } from "react";
import { Button } from "../ui/button";
import { formatDietForSpeech } from "@/lib/services/dietText";
import { generateVoice } from "@/lib/services/generatedVoice";

export default function DietPlan({ diet }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleDietRead = async () => {
    try {
      setIsSpeaking(true);
      const text = formatDietForSpeech(diet);
      const audioBlob = await generateVoice(text);
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
      audio.onended = () => setIsSpeaking(false);
    } catch (error) {
      console.log(error);
      setIsSpeaking(false);
    }
  };

  return (
    <section className="w-full max-w-4xl space-y-6">
      <Button onClick={handleDietRead} disabled={isSpeaking}>
        {isSpeaking ? "Speaking..." : "🔊 Read Diet Plan"}
      </Button>
      <div className="p-4 rounded-xl bg-yellow-100">
        <p className="font-medium">Daily Calorie Focus</p>
        <p className="text-sm text-gray-700">{diet.daily_calorie_focus}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(diet.meal_plan).map(([meal, options]) => (
          <div key={meal} className="p-4 rounded-xl border bg-white">
            <h3 className="font-semibold capitalize mb-2">{meal}</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {options.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
