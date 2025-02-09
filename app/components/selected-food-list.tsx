'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
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

  const [hoveredFood, setHoveredFood] = useState<string | null>(null) // Track hovered food

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
    <div className="h-full pl-0 shadow-sm md:border-l md:pl-4">
      <div className="">
        <div className="mb-6 md:mt-4">
          <NutritionProgress
            initialGoals={{
              calories: { current: totalCalories, target: savedTargets.calories.target },
              protein: { current: totalProtein, target: savedTargets.protein.target },
              carbs: { current: totalCarbs, target: savedTargets.carbs.target }
            }}
            onGoalsUpdate={handleGoalsUpdate}
          />
        </div>
        <div className="mx-2 mt-2 rounded-xl rounded-b-none outline outline-8 outline-[#2e3039]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10px] text-left">#</TableHead>
                <TableHead className="w-[150px]">Food</TableHead>
                <TableHead className="text-center">Protein</TableHead>
                <TableHead className="text-center">Calories</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="max-h-[300px] overflow-y-auto">
              {' '}
              {Object.entries(foodCounts).map(([foodName, count], i) => {
                const food = selectedFoods.find((f) => f.name === foodName)
                if (!food || count === 0) return null // Skip rendering if food not found or count is 0
                return (
                  <TableRow
                    className="dark:hover:bg-[#2e3039]"
                    key={i}
                    onMouseEnter={() => setHoveredFood(foodName)} // Set hovered food on mouse enter
                    onMouseLeave={() => setHoveredFood(null)}>
                    {' '}
                    {/* Clear hovered food on mouse leave */}
                    <TableCell className="w-[10px] text-left font-medium text-muted-foreground">
                      x{count}
                    </TableCell>
                    <TableCell className="flex w-[150px] gap-2 font-medium">
                      <div>{foodName}</div>
                      <div
                        className={`flex items-center justify-center gap-2 ${
                          hoveredFood === foodName ? 'opacity-100' : 'opacity-0'
                        } transition-opacity duration-200`}>
                        {' '}
                        {/* Conditionally render buttons */}
                        <Minus
                          onClick={() => {
                            const foodItem = selectedFoods.find((f) => f.name === foodName)
                            if (foodItem) {
                              onRemove(foodItem)
                            }
                          }}
                          className="h-4 w-4 cursor-pointer"
                        />
                        <Plus
                          onClick={() => {
                            const foodItem = selectedFoods.find((f) => f.name === foodName)
                            if (foodItem) {
                              onAdd(foodItem)
                            }
                          }}
                          className="h-4 w-4 cursor-pointer"
                        />
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
              <TableRow className="dark:bg-[#2e3039] dark:hover:bg-[#2e3039]">
                <TableCell className="text-center text-muted-foreground">#</TableCell>
                <TableCell className="w-[150px] font-medium">Total Protein</TableCell>
                <TableCell className="border-r text-center ">{totalProtein.toFixed()}g</TableCell>
                <TableCell className="text-center">{totalCalories.toFixed()}cal</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

{
  /* <Card key={selectedFood.name}>
            <CardContent className="flex items-center justify-between p-2 text-sm">
              <div>
                <CardTitle>x2 {selectedFood.name}</CardTitle>
              </div>
              <div className="text-lg font-bold">{selectedFood.protein} Protein</div>
              <div>Total Protein: {totalProtein}</div>
              <div>Total Calories: {totalCalories}</div>
            </CardContent>
          </Card> */
}
