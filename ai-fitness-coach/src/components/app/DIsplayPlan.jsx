import DietPlan from "./DietPlan";
import WorkoutPlan from "./WorkoutPlan";

function DisplayPlan({ plan }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6 max-w-2xl">
      <h2 className="text-xl font-bold mb-2">Workout Plan</h2>
      {/* <pre className="text-sm whitespace-pre-wrap">
        {JSON.stringify(plan.workout_plan, null, 2)}
      </pre> */}
      <WorkoutPlan workout={plan.workout_plan} />

      <h2 className="text-xl font-bold mt-4 mb-2">Diet Plan</h2>
      <DietPlan diet={plan.diet_plan} />
    </div>
  );
}

export default DisplayPlan;
