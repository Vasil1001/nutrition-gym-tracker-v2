'use client'

import LineTwoChart from '@/components/charts/NivoLineChart'
import FoodList from './components/food-list'
import SelectedFoodList from './components/selected-food-list'
import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Food } from '@/lib/types'
import { useAuth } from '@/app/context/AuthContext'
import { LineChartWeights } from '@/components/charts/LineChart'

export default function Page() {
  const { session } = useAuth()
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

  return (
    <div className="pt-0">
      <div className="grid h-full max-h-screen grid-cols-[2fr_1fr] gap-4">
        <FoodList
          foods={foodsArray}
          setFoods={setFoods}
          foodCounts={foodCounts}
          onAdd={handleAddFood}
          onRemove={handleRemoveFood}
          onClearSelectedFoods={handleClearSelectedFoods}
          isLoading={isLoading}
        />
        <SelectedFoodList selectedFoods={selectedFoods} foodCounts={foodCounts} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-6">
        <LineTwoChart />
        <LineChartWeights />
      </div>
    </div>
  )
}
