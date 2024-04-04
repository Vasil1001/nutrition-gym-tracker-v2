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
import { Minus, MinusIcon, Plus, PlusIcon } from 'lucide-react'
import { Food, FoodProps } from './food-list'
import App from '../../../components/ui/icons/plus-icon'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function FoodAsListTable({ foods, onAdd, onRemove }: FoodProps) {
  const [count, setCount] = useState(0)

  const handleAdd = (food: Food) => {
    setCount(count + 1)
    onAdd(food)
  }

  const handleRemove = (food: Food) => {
    if (count > 0) {
      setCount(count - 1)
      onRemove(food)
    }
  }
  return (
    <Card className="my-2 ml-2 ">
      <CardContent className="rounded-xl p-0 outline outline-8 outline-[#2e3039]">
        <div className="overflow-auto rounded-xl ">
          <Table className="">
            <TableHeader className="w-full bg-[#19191f]">
              <TableRow>
                <TableHead>Food</TableHead>
                <TableHead className="text-end">Serving Size</TableHead>
                <TableHead className="text-end">Calories</TableHead>
                <TableHead className="text-end">Protein</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foods.map((food, index) => (
                <TableRow
                  key={index}
                  className="group relative dark:bg-[#19191f] dark:hover:bg-[#2e3039] dark:hover:outline-0">
                  <div className="flex items-center justify-center gap-2 font-supreme text-sm font-medium text-muted-foreground transition-all delay-150">
                    <Minus
                      className="h-5 w-5 cursor-pointer opacity-0 group-hover:opacity-100 hover:text-foreground"
                      onClick={() => handleRemove(food)}
                    />
                    <p className="text-bold text-[1rem] tracking-tighter text-white">
                      {cn(count > 0 && 'x', count)}
                    </p>
                    <Plus
                      className="h-5 w-5 cursor-pointer opacity-0 group-hover:opacity-100 hover:text-foreground"
                      onClick={() => handleAdd(food)}
                    />
                  </div>
                  <TableCell className="font-semibold">{food.name}</TableCell>
                  <TableCell className="text-end">{food.servingSize} g</TableCell>
                  <TableCell className="text-end">{food.calories} cal</TableCell>
                  <TableCell className="mr-1.5 flex justify-end text-end">
                    {food.protein} g
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
