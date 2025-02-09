'use client'

import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import NutritionProgress from './nutrition-progress'
import { Food } from '@/lib/types'
import { Plus, Minus } from 'lucide-react'

type SelectedFoodProps = {
  selectedFoods: Food[]
  foodCounts: { [key: string]: number }
  onAdd: (food: Food) => void
  onRemove: (food: Food) => void
}

export default function SelectedFoodList({
  selectedFoods,
  foodCounts,
  onAdd,
  onRemove
}: SelectedFoodProps) {
  const [savedTargets, setSavedTargets] = useState({
    calories: { current: 0, target: 2000 },
    protein: { current: 0, target: 150 },
    carbs: { current: 0, target: 250 }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nutritionTargets')
      if (saved) {
        setSavedTargets(JSON.parse(saved))
      }
    }
  }, [])

  const handleGoalsUpdate = (newGoals: any) => {
    setSavedTargets(newGoals)
    if (typeof window !== 'undefined') {
      localStorage.setItem('nutritionTargets', JSON.stringify(newGoals))
    }
    console.log('New goals:', newGoals)
  }

  const totalProtein = Object.keys(foodCounts).reduce((total, foodName) => {
    const food = selectedFoods.find((f) => f.name === foodName)
    return total + (food ? Number(food.protein) * foodCounts[foodName] : 0)
  }, 0)

  const totalCalories = Object.keys(foodCounts).reduce((total, foodName) => {
    const food = selectedFoods.find((f) => f.name === foodName)
    return total + (food ? Number(food.calories) * foodCounts[foodName] : 0)
  }, 0)

  const totalCarbs = Object.keys(foodCounts).reduce((total, foodName) => {
    const food = selectedFoods.find((f) => f.name === foodName)
    return total + (food ? Number(food.carbs) * foodCounts[foodName] : 0)
  }, 0)

  return (
    <div className="flex flex-col pl-0 shadow-sm md:border-l md:pl-4">
      <div className="mb-6 flex-none md:mt-4">
        <NutritionProgress
          initialGoals={{
            calories: { current: totalCalories, target: savedTargets.calories.target },
            protein: { current: totalProtein, target: savedTargets.protein.target },
            carbs: { current: totalCarbs, target: savedTargets.carbs.target }
          }}
          onGoalsUpdate={handleGoalsUpdate}
        />
      </div>
      <div className="mx-2 mb-6 flex flex-1 flex-col overflow-hidden rounded-xl rounded-b-none outline outline-8 outline-[#2e3039]">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-[#19191f]">
            <TableRow>
              <TableHead className="w-[10px] text-left">#</TableHead>
              <TableHead className="w-[150px]">Food</TableHead>
              <TableHead className="text-center">Protein</TableHead>
              <TableHead className="text-center">Calories</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="max-h-[calc(100%-6rem)] overflow-y-auto">
            {Object.entries(foodCounts).map(([foodName, count], i) => {
              const food = selectedFoods.find((f) => f.name === foodName)
              if (!food || count === 0) return null
              return (
                <TableRow className="group dark:hover:bg-[#2e3039]" key={i}>
                  <TableCell className="w-[10px] text-left font-medium text-muted-foreground">
                    x{count}
                  </TableCell>
                  <TableCell className="w-[150px]">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium">{foodName}</span>
                      </div>
                      <div className="hidden items-center gap-1 group-hover:flex">
                        <Minus
                          onClick={() => onRemove(food)}
                          className="h-4 w-4 cursor-pointer transition-colors hover:text-red-500 active:text-red-600"
                        />
                        <Plus
                          onClick={() => onAdd(food)}
                          className="h-4 w-4 cursor-pointer transition-colors hover:text-emerald-500 active:text-emerald-600"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="border-r text-center">
                    {(Number(food.protein) * count).toFixed()}g
                  </TableCell>
                  <TableCell className="text-center">
                    {(Number(food.calories) * count).toFixed()}cal
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <div className="sticky bottom-0 w-full border-t bg-[#2e3039] text-sm hover:bg-[#2e3039]">
          <TableRow className="flex items-center border-none border-[#2e3039] bg-[#2e3039] px-4 pb-1 pt-3">
            <div className="w-[10px] text-center text-muted-foreground">#</div>
            <div className="ml-4 w-[150px] font-medium">Total</div>
            <div className="flex-1 text-center">{totalProtein.toFixed()}g</div>
            <div className="flex-1 text-center">{totalCalories.toFixed()}cal</div>
          </TableRow>
        </div>
      </div>
    </div>
  )
}
