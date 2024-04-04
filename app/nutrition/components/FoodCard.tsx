'use client'
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
import { cn } from '@/lib/utils'
import { Minus, Plus, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { FoodCardProps } from './food-card'

export default function FoodCard({ food, count, onAdd, onRemove, isListView }: FoodCardProps) {
  // const [count, setCount] = useState(0)

  const handleAdd = () => {
    // setCount(count + 1)
    onAdd()
  }

  const handleRemove = () => {
    if (count > 0) {
      // setCount(count - 1)
      onRemove()
    }
  }

  if (isListView) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recently Added Foods</CardTitle>
          <Button className="h-8 rounded-full" size="icon" variant="outline">
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Add</span>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <Table>
              <TableHeader className="w-full">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Calories</TableHead>
                  <TableHead>Protein (g)</TableHead>
                  <TableHead>Serving Size</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-gray-100/20 hover:bg-gray-100/30 dark:hover:bg-gray-800/30">
                  <TableCell className="font-semibold">Apple</TableCell>
                  <TableCell>95</TableCell>
                  <TableCell>0.5</TableCell>
                  <TableCell>1 medium (3-inch diameter)</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100/20 hover:bg-gray-100/30 dark:hover:bg-gray-800/30">
                  <TableCell className="font-semibold">Banana</TableCell>
                  <TableCell>105</TableCell>
                  <TableCell>1.3</TableCell>
                  <TableCell>1 medium</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100/20 hover:bg-gray-100/30 dark:hover:bg-gray-800/30">
                  <TableCell className="font-semibold">Yogurt</TableCell>
                  <TableCell>150</TableCell>
                  <TableCell>6</TableCell>
                  <TableCell>1 cup</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100/20 hover:bg-gray-100/30 dark:hover:bg-gray-800/30">
                  <TableCell className="font-semibold">Salad</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>1 serving</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    )
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
