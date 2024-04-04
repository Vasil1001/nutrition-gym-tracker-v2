'use client'
import { Button } from '@/components/ui/button'
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Minus, Plus, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import FoodAsListTable from './food-as-list-table'

type Food = {
  name: string
  servingSize: string
  protein: string
  calories: string
}

export type FoodCardProps = {
  food: Food
  count: number
  onAdd: () => void
  onRemove: () => void
  isListView: boolean
}

export default function FoodCard({ food, onAdd, onRemove, isListView }: FoodCardProps) {
  const [count, setCount] = useState(0)

  const handleAdd = () => {
    setCount(count + 1)
    onAdd()
  }

  const handleRemove = () => {
    if (count > 0) {
      setCount(count - 1)
      onRemove()
    }
  }

  if (isListView) {
    return <div className="flex flex-col gap-4">Test</div>
  } else {
    return (
      <Card key={food.name} className="group">
        <CardContent className=" gap-4 p-3 text-base">
          <div>
            <div className="flex justify-between">
              <CardTitle className="">{food.name}</CardTitle>
              <div className="flex items-center justify-center gap-2 font-supreme text-sm font-medium text-muted-foreground transition-all delay-150">
                <Minus
                  className="h-5 w-5 cursor-pointer opacity-0 group-hover:opacity-100 hover:text-foreground"
                  onClick={handleRemove}
                />
                <p className="text-bold text-[1rem] tracking-tighter text-white">
                  {cn(count > 0 && 'x', count)}
                </p>
                <Plus
                  className="h-5 w-5 cursor-pointer opacity-0 group-hover:opacity-100 hover:text-foreground"
                  onClick={handleAdd}
                />
              </div>
            </div>
            <CardDescription>
              <p className="-mt-0.5 mb-3 font-supreme text-[0.9rem] text-muted-foreground">
                Per {food.servingSize} serving
              </p>
            </CardDescription>
          </div>

          <div className="flex items-center justify-evenly gap-4 overflow-hidden">
            <div className="flex flex-1 flex-col items-center rounded-sm border border-[#19191f] p-1 text-[0.90rem]">
              <div className="text-[0.85rem] uppercase text-muted-foreground sm:hidden">PR</div>
              <div className="hidden text-[0.85rem] uppercase text-muted-foreground sm:block">
                Protein
              </div>
              {food.protein}g
            </div>
            <div className="flex flex-1 flex-col items-center rounded-sm border border-[#19191f] p-1 text-[0.90rem]">
              <div className="text-[0.85rem] uppercase text-muted-foreground sm:hidden">Cal</div>
              <div className="hidden text-[0.85rem] uppercase text-muted-foreground sm:block">
                Calories
              </div>
              {food.calories}c
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
}

{
  /* <Card key={food.name} className="group">
<CardContent className="flex justify-between gap-4 p-3 text-base">
  <div className="flex items-center justify-between">
    <CardTitle className="">{food.name}</CardTitle>
  </div>
  <p className="mt-0.5 font-supreme text-[0.9rem] text-muted-foreground">
    Per {food.servingSize} serving
  </p>
  <div className="flex items-center justify-evenly gap-4 overflow-hidden">
    <div className="flex flex-1 flex-col items-center text-[0.90rem]">
      <div className="text-[0.85rem] uppercase text-muted-foreground sm:hidden">PR</div>
      {food.protein}g
    </div>
    <div className="flex flex-1 flex-col items-center text-[0.90rem]">
      <div className="text-[0.85rem] uppercase text-muted-foreground sm:hidden">Cal</div>
      {food.calories}c
    </div>
    <div className="flex items-center justify-center gap-2 font-supreme text-sm font-medium text-muted-foreground transition-all delay-150">
      <Minus
        className="h-5 w-5 cursor-pointer hover:text-foreground"
        onClick={handleRemove}
      />
      <p className="text-bold text-[1rem] tracking-tighter text-white">
        {cn(count > 0 && 'x', count)}
      </p>
      <Plus className="h-5 w-5 cursor-pointer  hover:text-foreground" onClick={handleAdd} />
    </div>
  </div>
</CardContent>
</Card> */
}
