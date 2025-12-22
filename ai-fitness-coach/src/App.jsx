import React from "react";
import FitnessForm from "./components/app/FitnessForm";

function App() {
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <main className="relative min-h-screen">
      <img
        src="/fitness_background.jpg"
        alt="Background image"
        className="absolute object-cover w-full h-full -z-10 opacity-85"
      />
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <FitnessForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}

export default App;
