'use client'
import dynamic from 'next/dynamic'
import FoodList from './components/left-panel/food-list'
import FoodHistoryCards from './components/food-history/food-history-cards'
import AuthGuard from './components/auth/AuthGuard'
import { toast } from 'react-hot-toast'
import { useFoodData } from '@/hooks/useFoodData'
import { useEffect } from 'react'
import { useFoodSelection } from '@/hooks/useFoodSelection'
import { useAuth } from '@/app/context/AuthContext'
import { ProteinChart } from './components/charts/protein-chart'

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
    fetchSummaries
  } = useFoodSelection(session, toast, foodsArray)

  // Check if user is guest by comparing email with the guest email
  const isGuestUser = session?.user?.email === process.env.NEXT_PUBLIC_GUEST_EMAIL

  useEffect(() => {
    fetchFoods()
  }, [fetchFoods])

  useEffect(() => {
    fetchSummaries()
  }, [fetchSummaries])

  return (
    <AuthGuard>
      <div className="px-4 pb-4 pt-0 sm:px-0">
        {isGuestUser && (
          <div className="rounded-lg bg-zinc-100 px-4 py-3 shadow-sm">
            <p className="text-sm text-zinc-800">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-500"></span>
              You are currently using guest mode.
            </p>
          </div>
        )}
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
          />
        </div>
        <FoodHistoryCards
          summaries={summaries}
          handleSaveDay={saveFoodSummary}
          foodCounts={foodCounts}
        />
        <h3 className="mb-4 text-lg font-semibold">Protein Progress</h3>
        <div className="mb-6 rounded-lg border p-4">
          <ProteinChart data={summaries} />
        </div>
      </div>
    </AuthGuard>
  )
}
