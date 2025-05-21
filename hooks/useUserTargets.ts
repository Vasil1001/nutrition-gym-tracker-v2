import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { SavedTargets } from '@/lib/types'

/**
 * Custom hook to manage user nutrition targets with Supabase
 * @param session The user's session object
 * @returns Targets and target management functions
 */
const useUserTargets = (session: any) => {
  const [targets, setTargets] = useState<SavedTargets>({
    calories: { target: 2000, current: 0 },
    protein: { target: 150, current: 0 },
    carbs: { target: 250, current: 0 }
  })
  const [isLoading, setIsLoading] = useState(true)

  // Fetch user targets from Supabase
  const fetchTargets = useCallback(async () => {
    if (!session) {
      // For guest users, try to load from localStorage as fallback
      if (typeof window !== 'undefined') {
        try {
          const savedTargets = localStorage.getItem('nutritionTargets')
          const bmiData = localStorage.getItem('bmiData')

          if (savedTargets) {
            setTargets((prev) => ({ ...prev, ...JSON.parse(savedTargets) }))
          }

          if (bmiData) {
            const parsedBmiData = JSON.parse(bmiData)
            setTargets((prev) => ({ ...prev, ...parsedBmiData }))
          }
        } catch (error) {
          console.error('Error loading targets from localStorage:', error)
        }
      }
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('user_targets')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is the error code for no rows returned
        throw error
      }

      if (data) {
        // Transform the stored data into the expected format
        const transformedTargets: SavedTargets = {
          calories: { target: data.calories_target, current: 0 },
          protein: { target: data.protein_target, current: 0 },
          carbs: { target: data.carbs_target, current: 0 },
          bmi: data.bmi,
          bmiPosition: data.bmi_position,
          bmiStatus: data.bmi_status,
          underweightMax: data.underweight_max,
          normalMax: data.normal_max,
          overweightMax: data.overweight_max
        }
        setTargets(transformedTargets)
      } else {
        // If no targets in DB but we have localStorage data, use that
        if (typeof window !== 'undefined') {
          try {
            const savedTargets = localStorage.getItem('nutritionTargets')
            const bmiData = localStorage.getItem('bmiData')

            if (savedTargets) {
              setTargets((prev) => ({ ...prev, ...JSON.parse(savedTargets) }))
            }

            if (bmiData) {
              const parsedBmiData = JSON.parse(bmiData)
              setTargets((prev) => ({ ...prev, ...parsedBmiData }))
            }
          } catch (error) {
            console.error('Error loading targets from localStorage:', error)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user targets:', error)
    } finally {
      setIsLoading(false)
    }
  }, [session])

  // Update targets in Supabase
  const updateTargets = useCallback(
    async (newTargets: SavedTargets) => {
      setTargets(newTargets) // Update local state immediately for UI responsiveness

      if (!session) {
        // For guest users, fall back to localStorage
        if (typeof window !== 'undefined') {
          // Store nutrition targets
          const nutritionTargets = {
            calories: newTargets.calories,
            protein: newTargets.protein,
            carbs: newTargets.carbs
          }
          localStorage.setItem('nutritionTargets', JSON.stringify(nutritionTargets))

          // Store BMI data
          if (newTargets.bmi) {
            const bmiData = {
              bmi: newTargets.bmi,
              bmiPosition: newTargets.bmiPosition,
              bmiStatus: newTargets.bmiStatus,
              underweightMax: newTargets.underweightMax,
              normalMax: newTargets.normalMax,
              overweightMax: newTargets.overweightMax
            }
            localStorage.setItem('bmiData', JSON.stringify(bmiData))
          }
        }
        return
      }

      try {
        // Prepare data for insertion/update
        const targetData = {
          user_id: session.user.id,
          bmi: newTargets.bmi,
          bmi_position: newTargets.bmiPosition,
          bmi_status: newTargets.bmiStatus,
          calories_target: newTargets.calories.target,
          protein_target: newTargets.protein.target,
          carbs_target: newTargets.carbs.target,
          underweight_max: newTargets.underweightMax,
          normal_max: newTargets.normalMax,
          overweight_max: newTargets.overweightMax,
          height_cm: newTargets.heightCm, // If available
          weight_kg: newTargets.weightKg, // If available
          updated_at: new Date()
        }

        // Check if user already has targets
        const { data: existingData, error: checkError } = await supabase
          .from('user_targets')
          .select('id')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (checkError && checkError.code !== 'PGRST116') {
          throw checkError
        }

        // Upsert the data
        let result
        if (existingData) {
          result = await supabase.from('user_targets').update(targetData).eq('id', existingData.id)
        } else {
          result = await supabase.from('user_targets').insert(targetData)
        }

        if (result.error) throw result.error

        // Still maintain localStorage for backup and offline fallback
        if (typeof window !== 'undefined') {
          // Store nutrition targets
          const nutritionTargets = {
            calories: newTargets.calories,
            protein: newTargets.protein,
            carbs: newTargets.carbs
          }
          localStorage.setItem('nutritionTargets', JSON.stringify(nutritionTargets))

          // Store BMI data
          if (newTargets.bmi) {
            const bmiData = {
              bmi: newTargets.bmi,
              bmiPosition: newTargets.bmiPosition,
              bmiStatus: newTargets.bmiStatus,
              underweightMax: newTargets.underweightMax,
              normalMax: newTargets.normalMax,
              overweightMax: newTargets.overweightMax
            }
            localStorage.setItem('bmiData', JSON.stringify(bmiData))
          }
        }
      } catch (error) {
        console.error('Error updating user targets:', error)
        // Don't revert the local state to avoid UI flickering
      }
    },
    [session]
  )

  // Load targets on component mount or session change
  useEffect(() => {
    fetchTargets()
  }, [fetchTargets, session])
  return {
    targets,
    isLoading,
    updateTargets,
    fetchTargets
  }
}

export { useUserTargets }
