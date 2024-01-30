'use client'
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

type Food = {
  name: string
  servingSize: string
  protein: string
  calories: string
}

type FoodCardProps = {
  food: Food
  onAdd: () => void
  onRemove: () => void
}

export default function FoodCard({ food, onAdd, onRemove }: FoodCardProps) {
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
              {count > 0 && count}
              <Plus
                className="h-5 w-5 cursor-pointer opacity-0 group-hover:opacity-100 hover:text-foreground"
                onClick={handleAdd}
              />
            </div>
          </div>
          <CardDescription>
            <div className="mb-3 mt-0.5 font-supreme text-[0.8rem] text-muted-foreground">
              Per {food.servingSize} serving
            </div>
          </CardDescription>
        </div>

        <div className="flex items-center justify-evenly gap-4 overflow-hidden">
          <div className="flex flex-col items-center p-1 text-[0.90rem] ">
            <div className="text-[0.70rem] uppercase text-muted-foreground sm:hidden">PR</div>
            <div className="hidden text-[0.70rem] uppercase text-muted-foreground sm:block">
              Protein
            </div>
            {food.protein}
          </div>
          <div className="flex flex-col items-center p-1 text-[0.90rem] ">
            <div className="text-[0.70rem] uppercase text-muted-foreground sm:hidden">Cal</div>
            <div className="hidden text-[0.70rem] uppercase text-muted-foreground sm:block">
              Calories
            </div>
            {food.calories}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
