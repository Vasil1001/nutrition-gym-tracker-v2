'use client'

import { useState, useEffect } from 'react'
import { DataTable } from './data-table'
import { AddWeightModal } from './components/add-weight-modal'
import { Weight } from '@/lib/types'
import { columns } from './columns'

export default function Page() {
  const [weights, setWeights] = useState<Weight[]>(() => {
    // Initialize state from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('weights')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed)) {
            console.log('Initialized weights from localStorage:', parsed)
            return parsed
          }
        } catch (e) {
          console.error('Error parsing stored weights:', e)
        }
      }
    }
    return []
  })

  useEffect(() => {
    if (weights.length > 0) {
      try {
        localStorage.setItem('weights', JSON.stringify(weights))
        console.log('Saved weights to localStorage:', weights)
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    } else {
      // Optionally remove weights from localStorage if empty
      localStorage.removeItem('weights')
      console.log('Removed weights from localStorage because the array is empty.')
    }
  }, [weights])

  const handleAddWeight = (weight: Weight) => {
    setWeights((prevWeights) => {
      const newWeights = [...prevWeights, weight]
      console.log('Adding new weight:', weight)
      return newWeights
    })
  }

  return (
    <>
      <div className="mb-2 mt-6 text-3xl font-bold tracking-tighter">Weights Table</div>
      <AddWeightModal onAddWeight={handleAddWeight} />
      <DataTable columns={columns} data={weights} />
    </>
  )
}
