import { generateImage } from "@/lib/services/generatedImage";
import DietPlan from "./DietPlan";
import WorkoutPlan from "./WorkoutPlan";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { motion } from "framer-motion";
import TipsMotivations from "./TipsMotivations";
import Modal from "./Modal";
import { Skeleton } from "../ui/skeleton";

function DisplayPlan({ plan }) {
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageTitle, setImageTitle] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const handleExerciseClick = async (exercise) => {
    setImageTitle(exercise);
    setImageUrl(null);
    setLoadingImage(true);
    setImageModalOpen(true);

    try {
      const prompt = `Professional fitness photo of a person performing ${exercise}. Correct posture and form.Full body visible.Neutral gym background.High quality.No text, no watermark.`;
      const { image } = generateImage({ prompt });
      setImageUrl(image);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingImage(false);
    }
  };

  const handleDietClick = async (dietItem) => {
    setImageTitle(dietItem);
    setImageUrl(null);
    setLoadingImage(true);
    setImageModalOpen(true);

    try {
      const prompt = `High-quality professional food photography.Healthy ${dietItem}.Fresh ingredients.Realistic textures and colors.Served on a clean plate.Top-down or 45-degree angle.Natural lighting.Minimal background.No people.No text.No watermark.`;

      const { image } = generateImage({ prompt });
      setImageUrl(image);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingImage(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl mx-auto px-4"
      >
        <Card className="bg-white/90 backdrop-blur border shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl">
              Your Personalized Fitness Plan
            </CardTitle>
            <CardDescription>
              AI-generated workout and nutrition guidance tailored for you.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="workout" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="workout" className="w-full">
                  Workout
                </TabsTrigger>
                <TabsTrigger value="diet" className="w-full">
                  Diet
                </TabsTrigger>
                <TabsTrigger value="tips" className="w-full">
                  Tips
                </TabsTrigger>
              </TabsList>

              <TabsContent value="workout">
                <WorkoutPlan
                  workout={plan.workout_plan}
                  onExerciseClick={handleExerciseClick}
                />
              </TabsContent>

              <TabsContent value="diet">
                <DietPlan diet={plan.diet_plan} onDietClick={handleDietClick} />
              </TabsContent>

              <TabsContent value="tips">
                <TipsMotivations
                  tips={plan.tips}
                  motivation={plan.motivation}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
      <Modal
        open={imageModalOpen}
        setOpen={setImageModalOpen}
        title={imageTitle}
        description="This image is AI generated. It may not be perfect."
      >
        <div className="flex items-center justify-center min-h-[300px]">
          {loadingImage && (
            <div className="space-y-4 w-full">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
          )}

          {!loadingImage && imageUrl && (
            <img
              src={imageUrl}
              alt={imageTitle}
              className="rounded-xl max-h-[60vh] w-full object-contain"
            />
          )}
        </div>
      </Modal>
    </>
  );
}

export default DisplayPlan;
