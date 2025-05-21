import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Food } from '@/lib/types'
import { Plus, Minus } from 'lucide-react'

interface SelectedFoodListProps {
  selectedFoods: Food[]
  foodCounts: { [key: string]: number }
  onAdd: (food: Food) => void
  onRemove: (food: Food) => void
  totals: {
    protein: number
    calories: number
    carbs: number
  }
  proteinPercentageChange?: number // Added new prop
}

const proteinTarget = 150 // Hardcoded target, can be dynamic

export default function SelectedFoodList({
  selectedFoods,
  foodCounts,
  onAdd,
  onRemove,
  totals,
  proteinPercentageChange // Added new prop
}: SelectedFoodListProps) {
  const hasSelectedFoods = Object.keys(foodCounts).length > 0

  return (
    <div className="mx-2 mt-6 flex max-h-[450px] flex-1 flex-col rounded-xl rounded-b-none outline outline-8 outline-[#2e3039] ">
      {!hasSelectedFoods ? (
        <div className="flex h-[200px] items-center justify-center text-muted-foreground">
          No foods selected
        </div>
      ) : (
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-[#19191f]">
            <TableRow className="hover:bg-[#19191f]">
              <TableHead className="w-[20px] rounded-tl-xl text-left hover:bg-[#19191f]">
                #
              </TableHead>
              <TableHead className="w-[150px]">Food</TableHead>
              <TableHead className="w-[1px]  text-center">Protein</TableHead>
              <TableHead className="w-[1px]  text-center">Calories</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto sm:text-xs lg:text-sm">
            {Object.entries(foodCounts).map(([foodName, count], i) => {
              const food = selectedFoods.find((f) => f.name === foodName)
              if (!food || count === 0) return null
              return (
                <TableRow className="group dark:hover:bg-[#2e3039]" key={i}>
                  <TableCell className="w-[10px] text-left font-medium text-muted-foreground">
                    x{count}
                  </TableCell>
                  <TableCell className="w-[150px] border-r">
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
            {/* Totals row rendered inside the TableBody */}
            <TableRow className="sticky bottom-0 w-full border-t bg-[#2e3039] text-sm  font-medium hover:bg-[#2e3039]">
              <TableCell className="w-[20px] border-none py-3 pt-4 text-start text-muted-foreground">
                #
              </TableCell>
              <TableCell className="w-[120px] border-none py-3 pt-4 text-start">Totals</TableCell>
              <TableCell className="w-[1px] border-none py-3 pt-4 text-center">
                {totals.protein.toFixed()}g
              </TableCell>
              <TableCell className="w-[1px] border-none py-3 pt-4 text-center">
                {totals.calories.toFixed()}cal
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {!hasSelectedFoods && (
        <TableRow className="sticky bottom-0 flex w-full  border-none  bg-[#2e3039] text-sm hover:bg-[#2e3039]">
          <TableCell className="border-none py-3 pt-4 text-start text-muted-foreground"></TableCell>
          <TableCell className="w-[150px] flex-1 border-none py-3 pt-4 text-start font-medium"></TableCell>
          <TableCell className=" border-none py-5 text-center"></TableCell>
          <TableCell className=" border-none py-5 text-center"></TableCell>
        </TableRow>
      )}
      {/* Protein Intake Display */}
      {hasSelectedFoods && (
        <div className="grid grid-cols-2 items-center bg-[#2e3039] p-3">
          <div className="text-left">
            <p className="text-sm font-bold text-muted-foreground">Protein</p>
            <p className="text-3xl font-bold">{totals.protein.toFixed(1)}g</p>
            {proteinPercentageChange !== undefined && (
              <p
                className={`text-sm ${
                  proteinPercentageChange > 0
                    ? 'text-emerald-500'
                    : proteinPercentageChange < 0
                      ? 'text-red-500'
                      : 'text-muted-foreground' // Neutral color for 0% change or when undefined
                }`}>
                Today {proteinPercentageChange > 0 ? '+' : ''}
                {proteinPercentageChange.toFixed()}%
              </p>
            )}
          </div>
          <div className="ml-2 flex h-full flex-col justify-between">
            {/* Placeholder for progress bar/chart */}
            <p className="text-sm font-bold text-muted-foreground">Protein</p>

            <div className="h-5 w-full rounded-sm rounded-l-sm bg-gray-700">
              <div
                className="h-5  rounded-sm bg-emerald-500"
                style={{
                  width: `${Math.min(100, (totals.protein / (proteinTarget || 1)) * 100)}%`
                }}></div>
            </div>
            <p className="mt-1 text-right text-xs text-muted-foreground">
              Target: {proteinTarget ? `${proteinTarget}g` : 'Not set'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
