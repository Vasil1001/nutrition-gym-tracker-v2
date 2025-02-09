import { Button } from '@/components/ui/button'
import FoodAsListTable from './food-as-list-table'
import FoodCard from './food-card'
import { AddFoodModal } from './add-food-modal'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/app/context/AuthContext'
import { useState } from 'react'
import { Spinner } from '@/components/ui/loader'
import FoodCardSkeleton from '@/components/food-card-skeleton'
import { Food } from '@/lib/types'
import { foods as defaultFoods } from '@/lib/foods' // Add this import
import { useToast } from '@/hooks/use-toast' // Add this import

interface FoodProps {
  foods: Food[]
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>
  foodCounts: { [key: string]: number }
  onAdd: (food: Food) => void
  onRemove: (food: Food) => void
  onClearSelectedFoods: () => void
  isLoading: boolean
}

export default function FoodList({
  foods,
  setFoods,
  foodCounts,
  onAdd,
  onRemove,
  onClearSelectedFoods,
  isLoading
}: FoodProps) {
  const { session } = useAuth()
  const [isListView, setIsListView] = useState(false)
  const { toast } = useToast()

  // Function to check which default foods are missing
  const getMissingDefaultFoods = () => {
    const existingFoodNames = new Set(foods.map((f) => f.name))
    return defaultFoods.filter((food) => !existingFoodNames.has(food.name))
  }

  const handleAddDefaultFoods = async () => {
    if (!session) return

    try {
      const missingFoods = getMissingDefaultFoods()

      if (missingFoods.length === 0) {
        toast({
          title: 'All default foods exist',
          description: 'You already have all default foods in your list',
          variant: 'default'
        })
        return
      }

      const foodsWithUserId = missingFoods.map((food) => ({
        ...food,
        user_id: session.user.id
      }))

      const { data, error } = await supabase.from('foods').insert(foodsWithUserId).select()

      if (error) throw error

      if (data) {
        setFoods((prev) => [...prev, ...data])
        toast({
          title: 'Default foods added',
          description: `Added ${data.length} missing default foods to your list`,
          variant: 'default'
        })
      }
    } catch (error) {
      console.error('Error adding default foods:', error)
      toast({
        title: 'Error',
        description: 'Failed to add default foods',
        variant: 'destructive'
      })
    }
  }

  // Return null for the button if all default foods exist
  const renderAddDefaultFoodsButton = () => {
    const missingFoods = getMissingDefaultFoods()
    if (missingFoods.length === 0) return null

    return (
      <Button
        variant="outline"
        className="rounded px-2.5 py-2 text-xs transition duration-300 lg:text-sm"
        onClick={handleAddDefaultFoods}>
        Add {missingFoods.length} Default Foods
      </Button>
    )
  }

  const toggleView = () => setIsListView(!isListView)

  const handleAddNewFood = async (newFood: Food) => {
    setFoods([newFood, ...foods])
  }

  const handleDeleteFood = async (food: Food) => {
    if (!session) return

    const { error } = await supabase
      .from('foods')
      .delete()
      .eq('id', food.id)
      .eq('user_id', session.user.id)

    if (!error) {
      setFoods(foods.filter((f) => f.id !== food.id))
    }
  }

  return (
    <div className="h-full rounded-lg shadow-sm">
      <div className="mx-auto md:max-w-none">
        <div className="flex items-center justify-between">
          <h2 className="my-6 mt-4 text-xl font-semibold lg:text-2xl">Food List</h2>
          <div className="flex gap-2">
            <Button
              variant={'outline'}
              className="rounded px-2.5 py-2 text-xs transition duration-300 lg:text-sm"
              onClick={onClearSelectedFoods}>
              Clear Selected
            </Button>
            {renderAddDefaultFoodsButton()}
            <AddFoodModal onAddFood={handleAddNewFood} />
            <Button
              variant={'outline'}
              className="rounded px-2.5 py-2 text-xs transition duration-300 lg:text-sm"
              onClick={toggleView}>
              {isListView ? 'Gallery' : 'List'}
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="relative">
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50">
              <Spinner size="large" show={true} />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <FoodCardSkeleton key={index} />
              ))}
            </div>
          </div>
        ) : foods.length > 0 ? (
          <div
            className={`mb-2 grid gap-4 ${
              // Changed mb-4 to mb-2 to match selected food list
              isListView
                ? 'grid-cols-1'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
            } ${
              !isListView
                ? 'max-h-[70vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-track-background scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/30'
                : ''
            }`}>
            {' '}
            {/* Added scrollable container */}
            {isListView ? (
              <div>
                <FoodAsListTable
                  foods={foods}
                  setFoods={setFoods}
                  foodCounts={foodCounts}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              </div>
            ) : (
              foods.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  count={foodCounts[food.name] || 0}
                  onAdd={() => onAdd(food)}
                  onRemove={() => onRemove(food)}
                  onRemoveFoodCard={() => handleDeleteFood(food)}
                  isListView={isListView}
                />
              ))
            )}
          </div>
        ) : (
          // Show 'No foods added yet' only when not loading and foods array is empty
          <div className="col-span-full flex h-[50vh] items-center justify-center">
            <p className="text-center text-muted-foreground">No foods added yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
