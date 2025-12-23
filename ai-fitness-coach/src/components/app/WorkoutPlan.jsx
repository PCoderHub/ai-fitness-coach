import { useState } from "react";
import { Button } from "../ui/button";
import { formatWorkoutForSpeech } from "@/lib/services/workoutText";
import { generateVoice } from "@/lib/services/generatedVoice";

export default function WorkoutPlan({ workout }) {
  const [openDay, setOpenDay] = useState(null);
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
    <section className="w-full max-w-4xl space-y-6">
      {/* Summary */}
      <Button onClick={handleWorkoutRead} disabled={isSpeaking}>
        {isSpeaking ? "Speaking..." : "🔊 Read Workout Plan"}
      </Button>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-4 rounded-xl bg-blue-100">
          <p className="text-sm text-gray-600">Days / Week</p>
          <p className="text-2xl font-bold">{workout.frequency_per_week}</p>
        </div>
        <div className="p-4 rounded-xl bg-green-100">
          <p className="text-sm text-gray-600">Session Duration</p>
          <p className="text-2xl font-bold">
            {workout.session_duration_minutes} min
          </p>
        </div>
      </div>

      {/* Days */}
      {Object.entries(workout.weekly_schedule).map(([dayKey, day], idx) => (
        <div key={dayKey} className="border rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenDay(openDay === dayKey ? null : dayKey)}
            className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200"
          >
            <div>
              <h3 className="font-semibold">Day {idx + 1}</h3>
              <span className="text-sm text-gray-600">{day.focus}</span>
            </div>
            <span>{openDay === dayKey ? "−" : "+"}</span>
          </button>

          {openDay === dayKey && (
            <div className="p-4 space-y-3 bg-white">
              {day.exercises.map((ex, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 rounded-lg bg-gray-50"
                >
                  <div onClick={() => {}}>
                    <p className="font-medium">{ex.name}</p>
                    <p className="text-sm text-gray-500">
                      {ex.sets > 0 && `${ex.sets} sets`}{" "}
                      {ex.reps > 0 && `• ${ex.reps} reps`}{" "}
                      {ex.duration && `• ${ex.duration}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
