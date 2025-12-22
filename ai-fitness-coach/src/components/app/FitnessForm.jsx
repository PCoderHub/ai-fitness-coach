import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fitnessSchema } from "@/schemas/fitnessSchema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function FitnessForm({ onSubmit }) {
  const form = useForm({
    resolver: zodResolver(fitnessSchema),
    defaultValues: {
      name: "",
      age: 0,
      gender: "",
      height: 0,
      weight: 0,
      fitness_goal: "",
      fitness_level: "",
      workout_location: "",
      dietary_preferences: "",
      medical_history: ""
    },
  });

  const genderOptions = fitnessSchema.shape.gender.options;
  const fitnessGoalOptions = fitnessSchema.shape.fitness_goal.options;
  const fitnessLevelOptions = fitnessSchema.shape.fitness_level.options;
  const workoutLocationOptions = fitnessSchema.shape.workout_location.options;
  const dietaryPreferenceOptions = fitnessSchema.shape.dietary_preferences.options;

  return (
    <Card className="w-[90%] md:w-1/2 max-h-[90vh] mx-auto overflow-y-auto">
      <CardHeader>
        <CardTitle className="sticky text-2xl font-bold text-center text-indigo-500">
          Fitness Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-name"
                    className="text-indigo-500"
                  >
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="age"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-age"
                    className="text-indigo-500"
                  >
                    Age
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-age"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your age"
                    autoComplete="off"
                    type="number"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="gender"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-gender"
                    className="text-indigo-500"
                  >
                    Gender
                  </FieldLabel>
                  <Select value={field.value} id="form-rhf-demo-gender"
                    aria-invalid={fieldState.invalid} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        { genderOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="height"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-height"
                    className="text-indigo-500"
                  >
                    Height
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-height"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your height"
                    autoComplete="off"
                    type="number"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="weight"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-weight"
                    className="text-indigo-500"
                  >
                    Weight
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-weight"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your weight"
                    autoComplete="off"
                    type="number"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="fitness_goal"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-fitness_goal"
                    className="text-indigo-500"
                  >
                    Fitness Goal
                  </FieldLabel>
                  <Select value={field.value} id="form-rhf-demo-fitness_goal"
                    aria-invalid={fieldState.invalid} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select your fitness goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fitness Goal</SelectLabel>
                        { fitnessGoalOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="fitness_level"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-fitness_level"
                    className="text-indigo-500"
                  >
                    Fitness Level
                  </FieldLabel>
                  <Select value={field.value} id="form-rhf-demo-fitness_level"
                    aria-invalid={fieldState.invalid} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select your current fitness level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fitness Level</SelectLabel>
                        { fitnessLevelOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="workout_location"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-workout_location"
                    className="text-indigo-500"
                  >
                    Workout Location
                  </FieldLabel>
                  <Select value={field.value} id="form-rhf-demo-workout_location"
                    aria-invalid={fieldState.invalid} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select your workout location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Workout Location</SelectLabel>
                        { workoutLocationOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="dietary_preferences"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-dietary_preferences"
                    className="text-indigo-500"
                  >
                    Dietary Preferences
                  </FieldLabel>
                  <Select value={field.value} id="form-rhf-demo-dietary_preferences"
                    aria-invalid={fieldState.invalid} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select your dietary preferences" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Dietary Preferences</SelectLabel>
                        { dietaryPreferenceOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="medical_history"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-medical_history" className="text-indigo-500">
                    Medical History
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-medical_history"
                      placeholder="Eg: I have a heart condition."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                      maxLength={200}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field?.value?.length}/200 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Note: Please consult your doctor before starting any exercise. 
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="justify-center gap-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo" className="bg-indigo-500">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

export default FitnessForm;
