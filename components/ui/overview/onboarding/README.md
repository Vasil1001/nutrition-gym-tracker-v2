# Nutrition Tracker Onboarding

## Overview

The Nutrition Tracker onboarding process guides users through setting up their nutritional goals by adding activity levels, and fitness objectives. It calculates and displays BMI, suggested calorie intake, and protein requirements based on user inputs.

## Features

1. **User Data Collection:**

   - **Sex:** Male or Female.
   - **Weight:** Entered in pounds (lbs).
   - **Height:** Entered in inches.

2. **Activity Level Selection:**

   - **Sedentary:** Little to no exercise (Calorie Multiplier ×14).
   - **Moderately Active:** Regular exercise 3-5 days/week (Calorie Multiplier ×16).
   - **Highly Active:** Intense exercise 6-7 days/week (Calorie Multiplier ×18).
   - **Explanation:** Users can click on the info button to understand the basis of calorie multipliers.

3. **Fitness Goal Selection:**

   - **Build Muscle**
   - **Lose Weight**
   - **Maintain**

4. **Results Display:**
   - **BMI Calculation:** Displays BMI with color indicators:
     - Green: Normal (18.5 ≤ BMI < 25)
     - Orange: Overweight (25 ≤ BMI < 30)
     - Red: Underweight or Obese (BMI < 18.5 or BMI ≥ 30)
   - **Suggested Calories:** Based on activity level and weight.
   - **Suggested Protein:** 1.6g per kg of body weight.

## Technical Implementation

1. **Frameworks and Libraries:**

   - **Next.js:** Utilizes the App Router for routing.
   - **Tailwind CSS:** For responsive and utility-first styling.
   - **ShadCN UI Components:** Enhances UI elements like Modals and Tabs.

2. **Component Breakdown:**

   - **`Onboarding` Page:** Manages the onboarding steps and state.
   - **`Step1` Component:** Handles user data input (sex, weight, height).
   - **`Step2` Component:** Manages activity level selection with calorie multipliers.
   - **`Step3` Component:** Facilitates fitness goal selection.
   - **`Results` Component:** Displays calculated BMI, suggested calories, and protein.

3. **Calculations:**
   - **BMI:**
     $$ \text{BMI} = \frac{\text{weight (kg)}}{(\text{height (m)})^2} $$
   - **Calorie Intake:**
     - Sedentary: Weight (lbs) × 14
     - Moderately Active: Weight (lbs) × 16
     - Highly Active: Weight (lbs) × 18
   - **Protein Intake:**
     $$ \text{Protein} = 1.6 \times \text{weight (kg)} $$

## User Guidance

- **Understanding Calorie Multipliers:**
  Users can access detailed explanations of calorie multipliers by clicking the "Why These Numbers?" button in the Results section. This ensures transparency and helps users understand how their calorie needs are estimated based on their activity levels.

## Future Enhancements

- **Data Persistence:** Integrate a backend to save user data and progress.
- **Customization:** Allow users to input more detailed metrics or adjust multipliers based on additional factors.
- **Enhanced UI:** Incorporate more ShadCN components for a richer user experience.

## Contribution

Feel free to contribute by submitting issues or pull requests. Ensure adherence to the project's coding standards and guidelines.

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
// 1. Sedentary (Weight × 14): Little to no exercise.
// 2. Moderately Active (Weight × 16): Regular exercise 3-5 days/week.
// 3. Highly Active (Weight × 18): Intense exercise 6-7 days/week.
// Notes:
// - Each option displays its corresponding calorie multiplier for transparency.
// - Users can select only one activity level.
// - On selection, pass the chosen activity level to the parent component and proceed to Step 3.

// Step3.jsx

// Step 3: Select Fitness Goal.
// - Options:
// 1. Build Muscle
// 2. Lose Weight
// 3. Maintain
// Notes:
// - Each option is mutually exclusive using radio buttons.
// - On form submission, trigger the calculation of BMI, Calories, and Protein.
// - Pass the selected goal to the parent component and proceed to Results.

// Results.jsx

// Step 4: Display Targets.
// - BMI Calculation:
// - Displays the calculated BMI with color coding:
// - Green: Normal weight.
// - Orange: Overweight.
// - Red: Underweight or Obese.
// - Suggested Calories:
// - Based on the selected activity level and weight.
// - Suggested Protein:
// - Calculated as 1.6g per kg of body weight.
// - Restart Option:
// - Allows users to redo the onboarding process.
// - Information Button:
// - Provides users with explanations of calorie multipliers.
// Notes:
// - Ensure that calculations are accurate and reflect user inputs.
// - Maintain a clean and readable layout for results display.
