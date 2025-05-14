/**
 * Gets the BMI status and associated color based on the BMI value.
 * @param bmi - The BMI value to check
 * @returns Object with status string and color string
 */
export function getBmiStatus(bmi: number) {
  if (bmi < 18.5) return { status: 'Underweight', color: '#3b82f6' }; // blue-500
  else if (bmi >= 18.5 && bmi < 25) return { status: 'Normal weight', color: '#22c55e' }; // green-500
  else if (bmi >= 25 && bmi < 30) return { status: 'Overweight', color: '#f97316' }; // orange-500
  else return { status: 'Obese', color: '#ef4444' }; // red-500
}

/**
 * Calculates the percentage position of the BMI indicator on the scale
 * @param bmi - The BMI value
 * @returns The percentage position (0-100)
 */
export function calculateBmiPosition(bmi: number) {
  // BMI Scale Parameters
  const bmiMin = 15;
  const bmiMax = 35;
  const bmiRange = bmiMax - bmiMin;

  // Calculate position and clamp between 0% and 100%
  return Math.max(0, Math.min(100, ((bmi - bmiMin) / bmiRange) * 100));
}

/**
 * Calculates the BMI value from weight and height
 * @param weightKg - Weight in kilograms
 * @param heightCm - Height in centimeters
 * @returns The calculated BMI value
 */
export function calculateBmi(weightKg: number, heightCm: number) {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

/**
 * Calculates the segment positions for the BMI ranges
 * @returns Object with percentage positions for underweight, normal, and overweight boundaries
 */
export function getBmiRangePositions() {
  const bmiMin = 15;
  const bmiMax = 35;
  const bmiRange = bmiMax - bmiMin;

  return {
    underweightMax: ((18.5 - bmiMin) / bmiRange) * 100,
    normalMax: ((25 - bmiMin) / bmiRange) * 100,
    overweightMax: ((30 - bmiMin) / bmiRange) * 100,
  };
}
