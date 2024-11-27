import { Button } from '@/components/ui/button'
import { useState } from 'react'
import FoodAsListTable from './food-as-list-table'
import FoodCard from './food-card'
import { AddFoodModal } from './add-food-modal'

export type FoodProps = {
  foods: Food[]
  onAdd: (food: Food) => void
  onRemove: (food: Food) => void
  foodCounts: { [key: string]: number }
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>
}

export type Food = {
  name: string
  servingSize: string
  protein: string
  calories: string
  carbs: string
}

export default function FoodList({ foods, setFoods, foodCounts, onAdd, onRemove }: FoodProps) {
  const [isListView, setIsListView] = useState(false)

  const toggleView = () => setIsListView(!isListView)

  const handleAddNewFood = (newFood: Food) => {
    setFoods([newFood, ...foods])
  }

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="max-h-screen overflow-auto pr-4 scrollbar scrollbar-track-[#19191f] scrollbar-thumb-[#2e3039] lg:pr-0 ">
      <div className="flex  items-center justify-between">
        <h1 className="my-6 text-xl font-bold lg:text-2xl">Food List</h1>
        <div className=" flex gap-2">
          <AddFoodModal onAddFood={handleAddNewFood} />
          <Button
            className="rounded  px-2.5 py-2 text-xs transition duration-300 lg:text-sm "
            onClick={toggleView}>
            {isListView ? 'Gallery View' : 'List View'}
          </Button>
        </div>
      </div>
      <div
        className={`grid gap-4 ${
          isListView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
        }`}>
        {isListView ? (
          <div>
            <FoodAsListTable
              foods={foods}
              setFoods={setFoods}
              foodCounts={foodCounts}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          </div>
        ) : (
          <>
            {foods.map((food) => (
              <FoodCard
                key={food.name}
                food={food}
                count={foodCounts[food.name] || 0}
                onAdd={() => onAdd(food)}
                onRemove={() => onRemove(food)}
                isListView={isListView}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
