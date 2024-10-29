// Step1.jsx

// Step 1: Collect user's sex, weight, and height.
// - Sex: Dropdown selection between Male and Female.
// - Weight: Input in pounds (lbs).
// - Height: Input in inches.
// Notes:
// - Ensure all fields are required and validated for positive numbers.
// - On form submission, pass the collected data to the parent component and proceed to Step 2.

// Step2.jsx

// Step 2: Select Activity Level.
// - Options:
//   1. Sedentary (Weight × 14): Little to no exercise.
//   2. Moderately Active (Weight × 16): Regular exercise 3-5 days/week.
//   3. Highly Active (Weight × 18): Intense exercise 6-7 days/week.
// Notes:
// - Each option displays its corresponding calorie multiplier for transparency.
// - Users can select only one activity level.
// - On selection, pass the chosen activity level to the parent component and proceed to Step 3.

// Step3.jsx

// Step 3: Select Fitness Goal.
// - Options:
//   1. Build Muscle
//   2. Lose Weight
//   3. Maintain
// Notes:
// - Each option is mutually exclusive using radio buttons.
// - On form submission, trigger the calculation of BMI, Calories, and Protein.
// - Pass the selected goal to the parent component and proceed to Results.

// Results.jsx

// Step 4: Display Targets.
// - BMI Calculation:
//   - Displays the calculated BMI with color coding:
//     - Green: Normal weight.
//     - Orange: Overweight.
//     - Red: Underweight or Obese.
// - Suggested Calories:
//   - Based on the selected activity level and weight.
// - Suggested Protein:
//   - Calculated as 1.6g per kg of body weight.
// - Restart Option:
//   - Allows users to redo the onboarding process.
// - Information Button:
//   - Provides users with explanations of calorie multipliers.
// Notes:
// - Ensure that calculations are accurate and reflect user inputs.
// - Maintain a clean and readable layout for results display.
