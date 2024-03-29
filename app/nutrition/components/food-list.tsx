import React, { useState } from 'react'
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
  const [isListView, setIsListView] = useState(false)

  const toggleView = () => setIsListView(!isListView)
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="mb-5 max-h-screen overflow-auto pr-4 scrollbar scrollbar-track-[#19191f] scrollbar-thumb-[#2e3039] lg:pr-0 ">
      <div className="flex items-center justify-between">
        <h1 className="my-6 text-2xl font-bold">Food List</h1>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
          onClick={toggleView}>
          {isListView ? 'Show Gallery View' : 'Show List View'}
        </button>
      </div>
      <div
        className={`grid gap-4 ${
          isListView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
        }`}>
        {foods.map((food) => (
          <FoodCard
            isListView={isListView}
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
