import { generateImage } from "@/lib/services/generatedImage";
import DietPlan from "./DietPlan";
import WorkoutPlan from "./WorkoutPlan";
import ExerciseImageModal from "./ExerciseImageModal";
import { useState } from "react";

function DisplayPlan({ plan }) {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [exerciseImage, setExerciseImage] = useState(null);
  const [dietImage, setDietImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);

  const handleExerciseClick = async (exercise) => {
    setSelectedExercise(exercise);
    setExerciseImage(null);
    setLoadingImage(true);

    try {
      const prompt = `
Professional fitness photo of a person performing ${exercise}.
Correct posture and form.
Full body visible.
Neutral gym background.
High quality.
No text, no watermark.
`;
      const { image } = await generateImage({ prompt });
      setExerciseImage(image);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingImage(false);
    }
  };

  const handleDietClick = async (dietItem) => {
    setSelectedDiet(dietItem);
    setDietImage(null);
    setLoadingImage(true);

    try {
      const prompt = `High-quality professional food photography.
Healthy ${dietItem}.
Fresh ingredients.
Realistic textures and colors.
Served on a clean plate.
Top-down or 45-degree angle.
Natural lighting.
Minimal background.
No people.
No text.
No watermark.`;

      const { image } = await generateImage({ prompt });
      setDietImage(image);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingImage(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6 max-w-2xl">
      <h2 className="text-xl font-bold mb-2">Workout Plan</h2>
      <WorkoutPlan
        workout={plan.workout_plan}
        onExerciseClick={handleExerciseClick}
      />
      <ExerciseImageModal
        exercise={selectedExercise}
        imageUrl={exerciseImage}
        loading={loadingImage}
        onClose={() => setSelectedExercise(null)}
      />
      <h2 className="text-xl font-bold mt-4 mb-2">Diet Plan</h2>
      <DietPlan diet={plan.diet_plan} onDietClick={handleDietClick} />
      <ExerciseImageModal
        exercise={selectedDiet}
        imageUrl={dietImage}
        loading={loadingImage}
        onClose={() => setSelectedDiet(null)}
      />
    </div>
  );
}

export default DisplayPlan;
