import React, { useEffect, useRef, useState } from "react";
import FitnessForm from "./components/app/FitnessForm";
import { generatePrompt } from "./lib/services/prompt";
import { generatePlan } from "./lib/services/generatedPlan";
import { getPlan, getPlanCacheKey, savePlan } from "./lib/services/storage";
import DisplayPlan from "./components/app/DisplayPlan";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import Modal from "./components/app/Modal";
import PlanSkeleton from "./components/app/PlanSkeleton";

function App() {
  const [plan, setPlan] = useState(null);
  const [open, setOpen] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(false);

  const planSection = useRef(null);

  const handleSubmit = async (data) => {
    setLoadingPlan(true);
    setOpen(false);

    setTimeout(() => {
      planSection.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 300);

    try {
      const cacheKey = getPlanCacheKey(data);

      const cachedPlan = getPlan(cacheKey);
      if (cachedPlan) {
        console.log(cachedPlan);
        setPlan(cachedPlan);
        return;
      }
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

      if (start === -1 || end === -1) {
        throw new Error("Invalid AI response");
      }

      const jsonString = cleanedText.substring(start, end + 1);
      const finalPlan = JSON.parse(jsonString);
      setPlan(finalPlan);
      savePlan(cacheKey, finalPlan);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPlan(false);
    }
  };

  return (
    <main className="relative">
      <img
        src="/fitness_background.jpg"
        alt="Background image"
        className="fixed -z-10 object-fill md:object-cover w-full h-full opacity-85"
      />

      <section className="min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center min-h-screen gap-4"
        >
          <Card className="bg-white/10 backdrop-blur-2xl border-white/10 p-6 w-[95%] max-w-4xl">
            <CardHeader>
              <CardTitle className="text-4xl md:text-5xl text-white text-center">
                <span className="text-black">FitAI</span> - Your AI Fitness
                Coach
              </CardTitle>
              <CardDescription className="text-white text-lg md:text-2xl mt-2 text-center">
                Get personalized workout plans and achieve your fitness goals
                with smart guidance.
              </CardDescription>
            </CardHeader>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              className="flex justify-center"
            >
              <Button
                className="mt-4 p-1 w-full md:w-5/6 text-sm"
                onClick={() => setOpen(true)}
              >
                Get Started...
              </Button>
            </motion.div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          <Modal
            open={open}
            setOpen={setOpen}
            title="Fitness Form"
            description="Fill out the form below to get your personalized plan."
          >
            <FitnessForm onSubmit={handleSubmit} />
          </Modal>
        </motion.div>
      </section>

      {(loadingPlan || plan) && (
        <section ref={planSection} className="min-h-screen py-12">
          {loadingPlan && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <PlanSkeleton />
            </motion.div>
          )}
          {!loadingPlan && plan && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <DisplayPlan plan={plan} />
            </motion.div>
          )}
        </section>
      )}
    </main>
  );
}

export default App;
