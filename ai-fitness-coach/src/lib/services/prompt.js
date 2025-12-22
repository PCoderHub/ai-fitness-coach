export const generatePrompt = (data) => {
  const {
    name,
    age,
    gender,
    height,
    weight,
    fitness_goal,
    fitness_level,
    workout_location,
    dietary_preferences,
    medical_history,
  } = data;
  return `
    You are a certified fitness coach. 
    
    Generate a fully personalized workout plan, diet plan, tips and motivations for the user below: 
    
    User Details (JSON): 
    { 
        "name": "${name}", 
        "age": ${age}, 
        "gender": "${gender}", 
        "height_cm": ${height}, 
        "weight_kg": ${weight}, 
        "fitness_goal": "${fitness_goal}", 
        "fitness_level": "${fitness_level}", 
        "workout_location": "${workout_location}", 
        "dietary_preferences": "${dietary_preferences}", 
        "medical_history": "${medical_history || "None"}"
    } 

    Rules:
    - Personalize workout intensity based on fitness level
    - Align exercises with workout location
    - Respect dietary preferences strictly
    - Decide frequency_per_week based on fitness level, goal, and recovery needs
    - Generate exactly the same number of workout days inside weekly_schedule
    - Use sequential keys: day_1, day_2, ..., day_n
    - Avoid exercises conflicting with medical history
    - No generic advice
    - No explanations outside JSON
    
    Output format (JSON only): 
    { 
        "workout_plan": { 
            "frequency_per_week": Number, 
            "session_duration_minutes": Number, 
            "weekly_schedule": { 
                "day_1": { 
                    "focus": String, 
                    "exercises": [ 
                        { 
                            "name": String, 
                            "duration": String, 
                            "sets": Number, 
                            "reps": Number 
                        } 
                    ] 
                }
            }
        }, 
        "diet_plan": { 
            "daily_calorie_focus": String, 
            "meal_plan": { 
                "breakfast": [String],
                "lunch": [String],
                "dinner": [String],
                "snacks": [String] 
            } 
        }, 
        "tips": [String], 
        "motivation": [String] 
    } 
       
    Return only valid JSON.
    If the plan cannot be generated, return empty JSON object {}.`;
};
