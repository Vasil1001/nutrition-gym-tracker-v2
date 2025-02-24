'use client'
import dynamic from 'next/dynamic'
import { ProteinChart } from './components/protein-chart'

import FoodList from './components/left-panel/food-list'
import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Food } from '@/lib/types'
import { useAuth } from '@/app/context/AuthContext'
import { FoodSummary } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import FoodHistoryCards from './components/food-history-cards'
import { Spinner } from '@/components/ui/spinner'

const RightPanel = dynamic(() => import('./components/right-panel'), { ssr: false })

export default function Page() {
  const { session, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [foodsArray, setFoods] = useState<Food[]>([])
  const [selectedFoods, setSelectedFoods] = useState<Food[]>(() => {
    const savedSelectedFoods = localStorage.getItem('selectedFoods')
    return savedSelectedFoods ? JSON.parse(savedSelectedFoods) : []
  })
  const [foodCounts, setFoodCounts] = useState<{ [key: string]: number }>(() => {
    const savedFoodCounts = localStorage.getItem('foodCounts')
    return savedFoodCounts ? JSON.parse(savedFoodCounts) : {}
  })
  const [summaries, setSummaries] = useState<FoodSummary[]>([])

  const handleAddFood = useCallback((food: Food) => {
    setSelectedFoods((prev) => [...prev, food])
    setFoodCounts((prev) => ({
      ...prev,
      [food.name]: (prev[food.name] || 0) + 1
    }))
  }, [])

  const handleRemoveFood = useCallback((food: Food) => {
    setFoodCounts((prevCounts) => {
      const currentCount = prevCounts[food.name] || 0
      if (currentCount > 1) {
        return { ...prevCounts, [food.name]: currentCount - 1 }
      } else {
        const newCounts = { ...prevCounts }
        delete newCounts[food.name]
        setSelectedFoods((prev) => prev.filter((f) => f.name !== food.name))
        return newCounts
      }
    })
  }, [])

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

  const fetchSummaries = useCallback(async () => {
    if (!session) return

    try {
      const { data, error } = await supabase
        .from('food_summaries')
        .select('*')
        .eq('user_id', session.user.id)
        .order('date', { ascending: false })

      if (error) throw error
      setSummaries(data || [])
    } catch (error) {
      console.error('Error fetching summaries:', error)
      toast({
        title: 'Error',
        description: 'Failed to load food history',
        variant: 'destructive'
      })
    }
  }, [session, toast])

  // Fetch foods on mount and when session changes
  useEffect(() => {
    fetchFoods()
  }, [fetchFoods])

  useEffect(() => {
    fetchSummaries()
  }, [fetchSummaries])

  useEffect(() => {
    localStorage.setItem('selectedFoods', JSON.stringify(selectedFoods))
    localStorage.setItem('foodCounts', JSON.stringify(foodCounts))
  }, [selectedFoods, foodCounts])

  useEffect(() => {
    if (!loading && !session) {
      router.push('/login')
    }
  }, [session, loading, router])

  // Conditionally render the content based on loading and session
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="large" show={true} />
      </div>
    )
  }

  if (!session) {
    return null
  }

  const handleClearSelectedFoods = () => {
    setSelectedFoods([])
    setFoodCounts({})
  }

  const handleSaveDay = async () => {
    if (!session) return
    if (Object.keys(foodCounts).length === 0) {
      toast({
        title: 'No foods selected',
        description: 'Please select some foods before saving.',
        variant: 'destructive'
      })
      return
    }

    const summaryData = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      user_id: session.user.id,
      totalProtein: Number(
        Object.entries(foodCounts)
          .reduce((total, [foodName, count]) => {
            const food = selectedFoods.find((f) => f.name === foodName)
            return total + (food ? food.protein * count : 0)
          }, 0)
          .toFixed(2)
      ),
      totalCalories: Number(
        Object.entries(foodCounts)
          .reduce((total, [foodName, count]) => {
            const food = selectedFoods.find((f) => f.name === foodName)
            return total + (food ? food.calories * count : 0)
          }, 0)
          .toFixed(2)
      ),
      totalCarbs: Number(
        Object.entries(foodCounts)
          .reduce((total, [foodName, count]) => {
            const food = selectedFoods.find((f) => f.name === foodName)
            return total + (food ? food.carbs * count : 0)
          }, 0)
          .toFixed(2)
      ),
      foods: Object.entries(foodCounts).map(([name, count]) => {
        const food = selectedFoods.find((f) => f.name === name)!
        return {
          name,
          count,
          protein: Number(food.protein * count),
          calories: Number(food.calories * count),
          carbs: Number(food.carbs * count)
        }
      })
    }

    try {
      console.log('Saving summary:', summaryData) // Add this for debugging
      const { error } = await supabase.from('food_summaries').insert(summaryData)

      if (error) {
        console.error('Supabase error:', error) // Add this for debugging
        throw error
      }

      setSummaries([summaryData, ...summaries])
      toast({
        title: 'Day saved!',
        description: 'Your daily food summary has been saved.'
      })
      handleClearSelectedFoods()
    } catch (error) {
      console.error('Error saving summary:', error)
      toast({
        title: 'Error',
        description: 'Failed to save food summary. Check console for details.',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="px-4 pb-4 pt-0 sm:px-0">
      <div className="grid h-full gap-4 border-b md:grid-cols-[2fr_1fr]">
        <div className="relative order-2 md:order-1">
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
        <RightPanel
          selectedFoods={selectedFoods}
          foodCounts={foodCounts}
          onAdd={handleAddFood}
          onRemove={handleRemoveFood}
        />
      </div>
      <FoodHistoryCards
        summaries={summaries}
        handleSaveDay={handleSaveDay}
        foodCounts={foodCounts}
      />
      <h3 className="mb-4 text-lg font-semibold">Protein Progress</h3>
      <div className="mb-6 rounded-lg border p-4">
        <ProteinChart data={summaries} />
      </div>
    </div>
  )
}
