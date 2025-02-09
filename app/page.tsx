'use client'

import LineTwoChart from '@/components/charts/NivoLineChart'
import FoodList from './components/food-list'
import SelectedFoodList from './components/selected-food-list'
import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Food } from '@/lib/types'
import { useAuth } from '@/app/context/AuthContext'
import { LineChartWeights } from '@/components/charts/LineChart'
import { Button } from '@/components/ui/button'
import { FoodSummary } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import FoodSummaryCards from './components/food-summary-cards'

export default function Page() {
  const { session } = useAuth()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [foodsArray, setFoods] = useState<Food[]>([])
  const [selectedFoods, setSelectedFoods] = useState<Food[]>(() => {
    if (typeof window !== 'undefined') {
      const savedSelectedFoods = localStorage.getItem('selectedFoods')
      return savedSelectedFoods ? JSON.parse(savedSelectedFoods) : []
    }
    return []
  })
  const [foodCounts, setFoodCounts] = useState<{ [key: string]: number }>(() => {
    if (typeof window !== 'undefined') {
      const savedFoodCounts = localStorage.getItem('foodCounts')
      return savedFoodCounts ? JSON.parse(savedFoodCounts) : {}
    }
    return {}
  })
  const [summaries, setSummaries] = useState<FoodSummary[]>([])
  const { toast } = useToast()

  const fetchFoods = useCallback(async () => {
    if (!session) {
      setFoods([])
      setIsLoading(false)
      return
    }

    try {
      // Start loading
      setIsLoading(true)

      const { data, error } = await supabase
        .from('foods')
        .select('*')
        .eq('user_id', session.user.id)

      if (error) throw error

      // Update foods state
      setFoods(data || [])
    } catch (error) {
      console.error('Error fetching foods:', error)
      setFoods([])
    } finally {
      // Stop loading after foods are updated
      setIsLoading(false)
    }
  }, [session])

  // Fetch foods on mount and when session changes
  useEffect(() => {
    fetchFoods()
  }, [fetchFoods])

  useEffect(() => {
    if (!session) {
      router.push('/login')
    }
  }, [session, router])


  const handleAddFood = (food: Food) => {
    setSelectedFoods([...selectedFoods, food])
    const newCount = (foodCounts[food.name] || 0) + 1
    setFoodCounts({ ...foodCounts, [food.name]: newCount })
  }

  const handleRemoveFood = (food: Food) => {
    setFoodCounts((prevCounts) => {
      const currentCount = prevCounts[food.name] || 0
      if (currentCount > 1) {
        return { ...prevCounts, [food.name]: currentCount - 1 }
      } else {
        const newCounts = { ...prevCounts }
        delete newCounts[food.name]
        setSelectedFoods(selectedFoods.filter((f) => f.name !== food.name))
        return newCounts
      }
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedFoods', JSON.stringify(selectedFoods))
      localStorage.setItem('foodCounts', JSON.stringify(foodCounts))
    }
  }, [selectedFoods, foodCounts])

  const handleClearSelectedFoods = () => {
    setSelectedFoods([])
    setFoodCounts({})
  }

  const handleSaveDay = () => {
    if (Object.keys(foodCounts).length === 0) {
      toast({
        title: 'No foods selected',
        description: 'Please select some foods before saving.',
        variant: 'destructive'
      })
      return
    }

    const summary: FoodSummary = {
      id: Date.now().toString(), // Simple ID for now
      date: new Date().toISOString(),
      totalProtein: Object.entries(foodCounts).reduce((total, [foodName, count]) => {
        const food = selectedFoods.find((f) => f.name === foodName)
        return total + (food ? food.protein * count : 0)
      }, 0),
      totalCalories: Object.entries(foodCounts).reduce((total, [foodName, count]) => {
        const food = selectedFoods.find((f) => f.name === foodName)
        return total + (food ? food.calories * count : 0)
      }, 0),
      totalCarbs: Object.entries(foodCounts).reduce((total, [foodName, count]) => {
        const food = selectedFoods.find((f) => f.name === foodName)
        return total + (food ? food.carbs * count : 0)
      }, 0),
      foods: Object.entries(foodCounts).map(([name, count]) => {
        const food = selectedFoods.find((f) => f.name === name)!
        return {
          name,
          count,
          protein: food.protein * count,
          calories: food.calories * count,
          carbs: food.carbs * count
        }
      })
    }

    setSummaries([summary, ...summaries])
    toast({
      title: 'Day saved!',
      description: 'Your daily food summary has been saved.'
    })
    handleClearSelectedFoods()
  }

  return (
    <div className="px-4 pb-4 pt-0 sm:px-0">
      <div className="grid h-full gap-4 border-b md:grid-cols-[2fr_1fr]">
        <div className="relative">
          <FoodList
            foods={foodsArray}
            setFoods={setFoods}
            foodCounts={foodCounts}
            onAdd={handleAddFood}
            onRemove={handleRemoveFood}
            onClearSelectedFoods={handleClearSelectedFoods}
            isLoading={isLoading}
          />
        </div>
        <div className="relative max-h-[calc(100vh-13rem)] overflow-hidden">
          <SelectedFoodList
            selectedFoods={selectedFoods}
            foodCounts={foodCounts}
            onAdd={handleAddFood}
            onRemove={handleRemoveFood}
          />
        </div>
      </div>

      <FoodSummaryCards
        summaries={summaries}
        handleSaveDay={handleSaveDay}
        foodCounts={foodCounts}
      />

      {/* <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <LineTwoChart />
        <LineChartWeights />
      </div> */}
    </div>
  )
}
