import { useState, useEffect } from 'react'

export const useLocalStorageFoodCounts = () => {
  const [foodCounts, setFoodCounts] = useState<{ [key: string]: number }>(() => {
    const savedFoodCounts = localStorage.getItem('foodCounts')
    return savedFoodCounts ? JSON.parse(savedFoodCounts) : {}
  })

  useEffect(() => {
    localStorage.setItem('foodCounts', JSON.stringify(foodCounts))
  }, [foodCounts])

  return { foodCounts, setFoodCounts }
}
