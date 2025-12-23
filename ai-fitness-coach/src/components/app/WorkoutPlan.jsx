import { motion } from "framer-motion";

import { useState } from "react";
import { Button } from "../ui/button";
import { formatWorkoutForSpeech } from "@/lib/services/workoutText";
import { generateVoice } from "@/lib/services/generatedVoice";
import { Card, CardContent } from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "../ui/badge";

export default function WorkoutPlan({ workout, onExerciseClick }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleWorkoutRead = async () => {
    try {
      setIsSpeaking(true);

      const text = formatWorkoutForSpeech(workout);
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
      {/* Summary */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="flex-1">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Days / Week</p>
            <p className="text-2xl font-bold">{workout.frequency_per_week}</p>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Session Duration</p>
            <p className="text-2xl font-bold">
              {workout.session_duration_minutes} min
            </p>
          </CardContent>
        </Card>
      </div>

      <Button
        onClick={handleWorkoutRead}
        disabled={isSpeaking}
        className="w-full sm:w-fit"
      >
        {isSpeaking ? "Speaking..." : "🔊 Read Workout Plan"}
      </Button>

      {/* Weekly Schedule */}
      <Accordion type="single" collapsible className="space-y-2">
        {Object.entries(workout.weekly_schedule).map(([dayKey, day], idx) => (
          <AccordionItem
            key={dayKey}
            value={dayKey}
            className="border rounded-xl"
          >
            <AccordionTrigger className="px-4">
              <div className="text-left">
                <p className="font-semibold">Day {idx + 1}</p>
                <p className="text-sm text-muted-foreground">{day.focus}</p>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-4 pb-4 space-y-3">
              {day.exercises.map((ex, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/50"
                >
                  <div>
                    <p
                      onClick={() => onExerciseClick(ex.name)}
                      className="font-medium hover:underline cursor-pointer"
                    >
                      {ex.name}
                    </p>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {ex.sets > 0 && (
                        <Badge variant="secondary">{ex.sets} sets</Badge>
                      )}
                      {ex.reps > 0 && (
                        <Badge variant="secondary">{ex.reps} reps</Badge>
                      )}
                      {ex.duration && ex.duration !== "0" && (
                        <Badge variant="outline">{ex.duration}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  );
}
