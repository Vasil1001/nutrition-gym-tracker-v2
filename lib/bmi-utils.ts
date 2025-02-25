export function getBmiStatus(bmi: number) {
  if (bmi < 18.5) return { status: 'Underweight', color: '#2196F3' }
  if (bmi < 25) return { status: 'Healthy Weight', color: '#4CAF50' }
  if (bmi < 30) return { status: 'Overweight', color: '#FF9800' }
  return { status: 'Obese', color: '#F44336' }
}

export function calculateBmiPosition(bmi: number) {
  if (bmi < 18.5) return (bmi / 18.5) * 18.5
  if (bmi < 25) return 18.5 + ((bmi - 18.5) / 6.5) * (25 - 18.5)
  if (bmi < 30) return 25 + ((bmi - 25) / 5) * (30 - 25)
  return Math.min(100, 30 + ((bmi - 30) / 5) * (35 - 30))
}
