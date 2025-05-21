'use client'
import dynamic from 'next/dynamic'
import FoodList from './components/left-panel/food-list'
import FoodHistoryCards from './components/food-history/food-history-cards'
import AuthGuard from './components/auth/AuthGuard'
import GuestBanner from './components/auth/GuestBanner'
import { useFoodData } from '@/hooks/useFoodData'
import { useEffect } from 'react'
import { useFoodSelection } from '@/hooks/useFoodSelection'
import { useAuth } from '@/app/context/AuthContext'
import { ProteinChart } from './components/charts/protein-chart'
import { useNutritionTotals } from '@/hooks/useNutritionTotals' // Added import

const RightPanel = dynamic(() => import('./components/right-panel'), { ssr: false })

export default function Page() {
  const { session } = useAuth()
  const { foodsArray, isLoading, fetchFoods, setFoods } = useFoodData(session)
  const {
    foodCounts,
    summaries,
    handleAddFood,
    handleRemoveFood,
    handleClearSelectedFoods,
    saveFoodSummary,
    fetchSummaries,
    deleteFoodSummary
  } = useFoodSelection(session, foodsArray)

  const isGuestUser = session?.user?.email === process.env.NEXT_PUBLIC_GUEST_EMAIL
  const liveTotals = useNutritionTotals(foodsArray, foodCounts) // Calculate live totals

  // Calculate protein percentage change
  let proteinPercentageChange: number | undefined
  if (summaries && summaries.length > 0) {
    const mostRecentSavedSummary = summaries[0] // Latest *saved* day
    if (mostRecentSavedSummary.totalProtein > 0) {
      proteinPercentageChange =
        ((liveTotals.protein - mostRecentSavedSummary.totalProtein) /
          mostRecentSavedSummary.totalProtein) *
        100
    } else {
      // Previous day had 0 protein
      if (liveTotals.protein > 0) proteinPercentageChange = undefined // Or a specific value like 10000 if you want to show a large increase
      // else proteinPercentageChange remains undefined (or 0 if liveTotals.protein is also 0)
    }
  } else {
    // No saved summaries at all
    if (liveTotals.protein > 0) proteinPercentageChange = undefined // Or a specific value
    // else proteinPercentageChange remains undefined
  }

  // Explicitly set -100% if current is 0 and previous had protein
  if (
    liveTotals.protein === 0 &&
    summaries &&
    summaries.length > 0 &&
    summaries[0].totalProtein > 0
  ) {
    proteinPercentageChange = -100
  }

  useEffect(() => {
    fetchFoods()
  }, [fetchFoods])

  useEffect(() => {
    fetchSummaries()
  }, [fetchSummaries])

  return (
    <AuthGuard>
      <div className="px-4 pb-4 pt-0 sm:px-0">
        {isGuestUser && <GuestBanner />}
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
            selectedFoods={foodsArray}
            foodCounts={foodCounts}
            onAdd={handleAddFood}
            onRemove={handleRemoveFood}
            proteinPercentageChange={proteinPercentageChange} // Pass the updated percentage
          />
        </div>
        <FoodHistoryCards
          summaries={summaries}
          handleSaveDay={() => {
            try {
              saveFoodSummary()
            } catch (e) {
              console.error('Error saving food day:', e)
            }
          }}
          foodCounts={foodCounts}
          onDeleteSummary={deleteFoodSummary}
        />
        <div className="rounded-lg border">
          <ProteinChart data={summaries} />
        </div>
      </div>
    </AuthGuard>
  )
}
