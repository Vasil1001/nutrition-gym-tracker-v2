'use client'

import LineTwoChart from '@/components/charts/NivoLineChart'
import FoodList, { Food } from './components/food-list'
import SelectedFoodList from './components/selected-food-list'
import { useState } from 'react'
import { foods } from '@/lib/foods'
import { LineChartWeights } from '@/components/charts/LineChart'

export default function Page() {
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([])
  const [foodCounts, setFoodCounts] = useState<{ [key: string]: number }>({})

  const handleAddFood = (food: Food) => {
    setSelectedFoods([...selectedFoods, food])
    const newCount = (foodCounts[food.name] || 0) + 1
    setFoodCounts({ ...foodCounts, [food.name]: newCount })
  }

  const handleRemoveFood = (food: Food) => {
    setFoodCounts((prevCounts) => {
      const currentCount = prevCounts[food.name] || 0
      if (currentCount > 1) {
        return { ...prevCounts, [food.name]: currentCount - 1 }
      } else {
        const newCounts = { ...prevCounts }
        delete newCounts[food.name]
        setSelectedFoods(selectedFoods.filter((f) => f.name !== food.name))
        return newCounts
      }
    })
  }

  return (
    <div className=" grid h-full max-h-screen grid-cols-[2fr_1fr] gap-4">
      <FoodList
        foods={foods}
        foodCounts={foodCounts}
        onAdd={handleAddFood}
        onRemove={handleRemoveFood}
      />
      <SelectedFoodList selectedFoods={selectedFoods} foodCounts={foodCounts} />
      <LineTwoChart />

      <div className="">
        <LineChartWeights />
      </div>
      {/* <Card className="col-span-1 flex flex-col justify-between">
            <CardContent className="flex flex-col items-center justify-end gap-4">
              <PieChartJobs />
            </CardContent>
          </Card> */}
    </div>
  )
}
