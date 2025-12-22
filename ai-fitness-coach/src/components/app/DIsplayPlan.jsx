function DisplayPlan({ plan }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6 max-w-2xl">
      <h2 className="text-xl font-bold mb-2">Workout Plan</h2>
      <pre className="text-sm whitespace-pre-wrap">
        {JSON.stringify(plan.workout_plan, null, 2)}
      </pre>

      <h2 className="text-xl font-bold mt-4 mb-2">Diet Plan</h2>
      <pre className="text-sm whitespace-pre-wrap">
        {JSON.stringify(plan.diet_plan, null, 2)}
      </pre>
    </div>
  );
}

export default DisplayPlan;
