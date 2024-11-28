'use client'

import LineTwoChart from '@/components/charts/NivoLineChart'
import FoodList from './components/food-list'
import SelectedFoodList from './components/selected-food-list'
import { useEffect, useState } from 'react'
import { foods } from '@/lib/foods'
import { LineChartWeights } from '@/components/charts/LineChart'
import { supabase } from '@/lib/supabaseClient'
import { Food } from '@/lib/types'

export default function Page() {
  const [fetchedSBFoods, setFetchedSBFoods] = useState<Food[]>([])
  const [fooddsArray, setFoods] = useState<Food[]>([])
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

  useEffect(() => {
    setFoods(fetchedSBFoods)
  }, [fetchedSBFoods])

  useEffect(() => {
    const fetchFoods = async () => {
      const { data: foodsData, error } = await supabase.from('foods').select('*')
      if (error) {
        console.error(error)
      } else {
        setFetchedSBFoods(foodsData)
        setFoods(foodsData)
      }
    }
    fetchFoods()
  }, [])

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
    <div>
      <div className=" grid h-full max-h-screen grid-cols-[2fr_1fr] gap-4">
        <FoodList
          foods={fooddsArray}
          setFoods={setFoods}
          foodCounts={foodCounts}
          onAdd={handleAddFood}
          onRemove={handleRemoveFood}
          onClearSelectedFoods={handleClearSelectedFoods}
        />
        <SelectedFoodList selectedFoods={selectedFoods} foodCounts={foodCounts} />

        {/* <Card className="col-span-1 flex flex-col justify-between">
              <CardContent className="flex flex-col items-center justify-end gap-4">
                <PieChartJobs />
              </CardContent>
            </Card> */}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-6">
        <LineTwoChart />
        <LineChartWeights /> {/* Ensure this component has similar styling for consistency */}
      </div>
    </div>
  )
}
