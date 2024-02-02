import React from 'react'
import FoodCard from './food-card'

type FoodProps = {
  foods: Food[]
  onAdd: (food: Food) => void
  onRemove: (food: Food) => void
}

export type Food = {
  name: string
  servingSize: string
  protein: string
  calories: string
}

export default function FoodList({ foods, onAdd, onRemove }: FoodProps) {
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="scrollbar-thumb-[#2e3039] scrollbar scrollbar-track-[#19191f] mb-5 max-h-screen overflow-auto pr-4 lg:pr-0 ">
      <h1 className="my-6 text-2xl font-bold">Food List</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
        {foods.map((food) => (
          <FoodCard
            key={food.name}
            food={food}
            onAdd={() => onAdd(food)}
            onRemove={() => onRemove(food)}
          />
        ))}
      </div>
    </div>
  )
}
