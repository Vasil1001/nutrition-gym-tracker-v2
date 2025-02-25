'use client'
import dynamic from 'next/dynamic'
import { ProteinChart } from './components/protein-chart'
import FoodList from './components/left-panel/food-list'
import FoodHistoryCards from './components/food-history/food-history-cards'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/app/context/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useFoodData } from '@/hooks/useFoodData'
import { useEffect } from 'react'
import { useFoodSelection } from '@/hooks/useFoodSelection'

const RightPanel = dynamic(() => import('./components/right-panel'), { ssr: false })

export default function Page() {
  const { session, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
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

  useEffect(() => {
    fetchFoods()
  }, [fetchFoods])

  useEffect(() => {
    fetchSummaries()
  }, [fetchSummaries])

  useEffect(() => {
    if (!loading && !session) {
      router.push('/login')
    }
  }, [session, loading, router])

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
          selectedFoods={foodsArray}
          foodCounts={foodCounts}
          onAdd={handleAddFood}
          onRemove={handleRemoveFood}
        />
      </div>
      <FoodHistoryCards
        summaries={summaries}
        handleSaveDay={saveFoodSummary} // renamed from handleSaveDay
        foodCounts={foodCounts}
      />
      <h3 className="mb-4 text-lg font-semibold">Protein Progress</h3>
      <div className="mb-6 rounded-lg border p-4">
        <ProteinChart data={summaries} />
      </div>
    </div>
  )
}
