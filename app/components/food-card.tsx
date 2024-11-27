'use client'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { FoodCardProps } from '@/lib/types'
import { Minus, Plus } from 'lucide-react'

export default function FoodCard({ food, count, onAdd, onRemove }: FoodCardProps) {
  const handleAdd = () => {
    onAdd()
  }

  const handleRemove = () => {
    if (count > 0) {
      onRemove()
    }
  }

  return (
    <Card key={food.name} className="group flex h-full flex-col rounded-xl">
      <CardContent className="flex flex-1 flex-col rounded-xl p-3 text-base">
        <div className="flex flex-1 flex-col">
          <div className="mb-2">
            <div className="flex items-start justify-between">
              <div className="flex">
                <CardTitle className="flex text-xs lg:text-[15px]">
                  {count > 0 && (
                    <span className="text-bold mr-1 whitespace-nowrap text-xs tracking-tighter text-white">
                      x{count}
                    </span>
                  )}
                  {food.name}
                </CardTitle>
              </div>
              <div className="relative z-10 flex shrink-0 items-end gap-0.5 font-supreme text-xs font-medium text-muted-foreground transition-all delay-150">
                {count > 0 && (
                  <Minus
                    className="h-5 w-5 cursor-pointer opacity-0 group-hover:opacity-100 hover:text-foreground active:text-gray-400"
                    onClick={handleRemove}
                  />
                )}
                <Plus
                  className="h-5 w-5 cursor-pointer opacity-0 group-hover:opacity-100 hover:text-foreground active:text-gray-400"
                  onClick={handleAdd}
                />
              </div>
            </div>
            <CardDescription>
              <p className="-mt-0.5 font-supreme text-xs text-muted-foreground">
                Per {food.servingSize} serving
              </p>
            </CardDescription>
          </div>

          <div className="mt-auto flex items-center justify-evenly gap-4">
            <div className="flex flex-1 flex-col items-center rounded-sm border border-[#19191f] p-1">
              <div className="text-xs uppercase text-muted-foreground xl:hidden">PR</div>
              <div className="hidden text-xs uppercase text-muted-foreground xl:block">Protein</div>
              <div className="text-xs">{food.protein}g</div>
            </div>
            <div className="flex flex-1 flex-col items-center rounded-sm border border-[#19191f] p-1">
              <div className="text-xs uppercase text-muted-foreground xl:hidden">CAL</div>
              <div className="hidden text-xs uppercase text-muted-foreground xl:block">
                Calories
              </div>
              <div className="text-xs">{food.calories}c</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
