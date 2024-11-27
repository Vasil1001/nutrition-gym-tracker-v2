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
  protein: string
  calories: string
}

export type FoodCardProps = {
  food: Food
  count: number
  onAdd: () => void
  onRemove: () => void
  isListView: boolean
}
