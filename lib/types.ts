export type Weight = {
  date: string
  exercise: string
  kgLifted: number
  sets: number
  reps: number
}

export type Food = {
  id?: number
  name: string
  serving_size: string
  protein: number
  calories: number
  carbs: number
  user_id?: string
}

export type FoodCardProps = {
  food: Food
  count: number
  onAdd: () => void
  onRemove: () => void
  onRemoveFoodCard: () => void
  isListView: boolean
}

export type FoodItem = {
  name: string
  count: number
  protein: number
  calories: number
  carbs: number
}

export interface FoodSummary {
  id: string
  date: string
  user_id: string
  totalProtein: number
  totalCalories: number
  totalCarbs: number
  foods: FoodItem[]
}

export type NutritionTarget = {
  current: number
  target: number
}

export type UserTargets = {
  calories: NutritionTarget
  protein: NutritionTarget
  carbs: NutritionTarget
  bmi?: number
}

export interface ProgressRingProps {
  calories: NutritionTarget
  protein: NutritionTarget
  carbs: NutritionTarget
  showLabels?: boolean
}

export interface SavedTargets {
  calories: NutritionTarget
  protein: NutritionTarget
  carbs: NutritionTarget
  bmi?: number
}
