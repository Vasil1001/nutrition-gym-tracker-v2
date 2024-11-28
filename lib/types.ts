export type Weight = {
  date: string
  exercise: string
  kgLifted: number
  sets: number
  reps: number
}

export type Food = {
  name: string
  servingSize: string
  protein: number
  calories: number
  carbs: number
}

export type FoodCardProps = {
  food: Food
  count: number
  onAdd: () => void
  onRemove: () => void
  onRemoveFoodCard: () => void
  isListView: boolean
}
