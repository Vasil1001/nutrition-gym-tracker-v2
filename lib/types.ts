export type Weight = {
  date: string
  exercise: string
  kgLifted: number
  sets: number
  reps: number
}

invalid input syntax for type uuid: ""



export type FoodCardProps = {
  food: Food
  count: number
  onAdd: () => void
  onRemove: () => void
  onRemoveFoodCard: () => void
  isListView: boolean
}
