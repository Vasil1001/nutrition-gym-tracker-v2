import React from 'react'
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

type SelectedFoodProps = {
  selectedFoods: Food[]
}

export type Food = {
  name: string
  servingSize: string
  protein: string
  calories: string
}
type FoodCount = {
  food: Food
  count: number
}

export default function SelectedFoodList({ selectedFoods }: SelectedFoodProps) {
  const totalProtein = selectedFoods.reduce(
    (total, selectedFood) => total + Number(selectedFood.protein),
    0
  )
  const totalCalories = selectedFoods.reduce(
    (total, selectedFood) => total + Number(selectedFood.calories),
    0
  )
  const foodCounts: FoodCount[] = selectedFoods.reduce((acc: FoodCount[], food) => {
    const existingFood = acc.find((item: FoodCount) => item.food.name === food.name)
    if (existingFood) {
      existingFood.count++
    } else {
      acc.push({ food, count: 1 })
    }
    return acc
  }, [])

  return (
    <div className="border-l pl-4">
      <h1 className="my-6 mb-8 text-2xl font-bold">Total Daily Intake</h1>
      <div className="ml-2 mt-2 rounded-xl rounded-b-none outline outline-8 outline-[#2e3039]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10px] text-left">#</TableHead>
              <TableHead className="w-[150px]">Food</TableHead>
              <TableHead className="text-center">Protein</TableHead>
              <TableHead className="text-center">Calories</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {foodCounts.map(({ food, count }, i) => (
              <TableRow key={i}>
                <TableCell className="w-[10px] text-left font-medium text-muted-foreground">
                  x{count}
                </TableCell>
                <TableCell className="w-[150px] font-medium">{food.name}</TableCell>
                <TableCell className="border-r text-center ">
                  {(Number(food.protein) * count).toFixed()}g
                </TableCell>
                <TableCell className="text-center">
                  {(Number(food.calories) * count).toFixed()}c
                </TableCell>
              </TableRow>
            ))}
            <TableRow className=" bg-[#2e3039] dark:hover:bg-[#2e3039]">
              <TableCell className="text-center text-muted-foreground">#</TableCell>
              <TableCell className="w-[150px] font-medium">Total Protein</TableCell>
              <TableCell className="border-r text-center ">{totalProtein.toFixed()}g</TableCell>
              <TableCell className="text-center">{totalCalories.toFixed()}cal</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
