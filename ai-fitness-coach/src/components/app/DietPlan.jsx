import { useState } from "react";
import { Button } from "../ui/button";
import { formatDietForSpeech } from "@/lib/services/dietText";
import { generateVoice } from "@/lib/services/generatedVoice";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function DietPlan({ diet, onDietClick }) {
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
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Button
        onClick={handleDietRead}
        disabled={isSpeaking}
        className="w-full sm:w-fit"
      >
        {isSpeaking ? "Speaking..." : "🔊 Read Diet Plan"}
      </Button>

      <Card className="bg-yellow-50 border">
        <CardContent className="p-4">
          <p className="font-medium">Daily Calorie Focus</p>
          <p className="text-sm text-muted-foreground">
            {diet.daily_calorie_focus}
          </p>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        {Object.entries(diet.meal_plan).map(([meal, options]) => (
          <Card key={meal}>
            <CardHeader>
              <CardTitle className="capitalize">{meal}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {options.map((item, idx) => (
                <p
                  key={idx}
                  onClick={() => onDietClick(item)}
                  className="cursor-pointer text-sm text-muted-foreground hover:underline"
                >
                  {item}
                </p>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}
