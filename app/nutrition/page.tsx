'use client'

import LineTwoChart from '@/components/charts/NivoLineChart'
import FoodList, { Food } from './components/food-list'
import SelectedFoodList from './components/selected-food-list'
import { useState } from 'react'

export default function Page() {
  const foods = [
    { name: 'Chicken Breast', servingSize: '100', protein: '31', calories: '165' },
    { name: 'Almonds', servingSize: '25', protein: '21', calories: '576' },
    { name: 'Broccoli', servingSize: '350', protein: '2.8', calories: '55' },
    { name: 'Salmon', servingSize: '53', protein: '20', calories: '206' },
    { name: 'Eggs', servingSize: '53', protein: '10', calories: '155' },
    { name: 'Quinoa', servingSize: '100', protein: '4.4', calories: '120' },
    { name: 'Tofu', servingSize: '100', protein: '8', calories: '144' },
    { name: 'Beef', servingSize: '100', protein: '26', calories: '250' },
    { name: 'Lentils', servingSize: '100', protein: '9', calories: '116' },
    { name: 'Greek Yogurt', servingSize: '100', protein: '10', calories: '59' },
    { name: 'Milk', servingSize: '100', protein: '3.4', calories: '42' },
    { name: 'Cheese', servingSize: '100', protein: '25', calories: '402' }
  ]

  // const selectedFoods = [
  //   { name: 'Chicken Breast', servingSize: '100g', protein: '31g', calories: '165' },
  //   { name: 'Milk', servingSize: '100g', protein: '3.4g', calories: '42' },
  //   { name: 'Cheese', servingSize: '100g', protein: '25g', calories: '402' }
  // ]
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
        setSelectedFoods(selectedFoods.filter((f) => f.name !== food.name)) // Move this line here
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
    </div>
  )
}
