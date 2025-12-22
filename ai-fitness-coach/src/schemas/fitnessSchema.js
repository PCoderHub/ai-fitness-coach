import * as z from "zod";

export const fitnessSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required and must be atleast 2 characters long"),
  age: z.number().min(18, "You must be 18 or older to use this application"),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  height: z.number().min(1, "Height is required"),
  weight: z.number().min(1, "Weight is required"),
  fitness_goal: z.enum(
    [
      "Weight Loss",
      "Muscle Gain",
      "Maintenance",
      "Body Toning",
      "Increase Stamina",
      "Increase Flexibility",
      "Posture Correction",
      "Build Routine",
      "Sleep Quality",
    ],
    { required_error: "Fitness goal is required" }
  ),
  fitness_level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    required_error: "Fitness level is required",
  }),
  workout_location: z.enum(["Home", "Gym", "Outdoor"], {
    required_error: "Workout location is required",
  }),
  dietary_preferences: z.enum(["Veg", "Non-Veg", "Vegan", "Keto"]),
  medical_history: z.string(),
});
