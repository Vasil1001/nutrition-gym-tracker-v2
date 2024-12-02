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
