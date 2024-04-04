import React, { useState } from 'react'
import FoodCard from './FoodCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import FoodAsListTable from './food-as-list-table'

export type FoodProps = {
  foods: Food[]
  onAdd: (food: Food) => void
  onRemove: (food: Food) => void
  foodCounts: { [key: string]: number };
}

export type Food = {
  name: string
  servingSize: string
  protein: string
  calories: string
}

export default function FoodList({ foods, foodCounts, onAdd, onRemove }: FoodProps) {
  const [isListView, setIsListView] = useState(false)

  const toggleView = () => setIsListView(!isListView)
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="mb-5 max-h-screen overflow-auto pr-4 scrollbar scrollbar-track-[#19191f] scrollbar-thumb-[#2e3039] lg:pr-0 ">
      <div className="flex items-center justify-between">
        <h1 className="my-6 text-2xl font-bold">Food List</h1>
        <Button className="rounded  px-4 py-2 transition duration-300 " onClick={toggleView}>
          {isListView ? 'Show Gallery View' : 'Show List View'}
        </Button>
      </div>
      <div
        className={`grid gap-4 ${
          isListView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
        }`}>
        {isListView ? (
          <div><FoodAsListTable foods={foods} foodCounts={foodCounts} onAdd={onAdd} onRemove={onRemove} /></div>
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
        {/* {foods.map((food) => (
          <FoodCard
            isListView={isListView}
            key={food.name}
            food={food}
            onAdd={() => onAdd(food)}
            onRemove={() => onRemove(food)}
          />
        ))} */}
      </div>
    </div>
  )
}
