'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { NutritionIcon } from '@/components/icons/NutritionIcon'
import { defaultFoods } from '@/seed-foods'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    confirmPassword?: string
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    const newErrors: typeof errors = {}
    if (!email) newErrors.email = 'Email is required'
    if (!password) newErrors.password = 'Password is required'
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password
      })
      if (signUpError) throw signUpError

      // Seed default foods for the new user
      if (signUpData?.user?.id) {
        const userId = signUpData.user.id
        const foodsToInsert = defaultFoods.map((food) => ({
          ...food,
          user_id: userId
        }))

        const { error: seedError } = await supabase.from('foods').insert(foodsToInsert)

        if (seedError) {
          console.error('Error seeding default foods:', seedError)
          // Optionally, you might want to inform the user about this error
        }
      }

      router.push('/login')
    } catch (error: any) {
      setErrors({ email: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#19191f] p-4">
      <div className="flex h-[600px] w-full max-w-4xl overflow-hidden rounded-2xl bg-white/80 shadow-xl backdrop-blur-sm">
        <div className="hidden flex-1 items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-12 md:flex">
          <div className="space-y-6 text-center text-white">
            <div className="rounded-2xl bg-white/20 p-6 backdrop-blur-sm">
              <div className="mx-auto mb-6 h-32 w-32 rounded-xl border-2 border-dashed bg-white/30 p-6">
                <NutritionIcon />
              </div>
              <h3 className="mb-2 text-2xl font-bold">Track Your Nutrition</h3>
              <p className="opacity-90">Start your journey to healthier eating today</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 bg-zinc-50 p-12">
          <div className="flex w-full max-w-md flex-col justify-between">
            <div>
              <div className="mb-10 text-center">
                <h2 className="mb-2 text-4xl font-bold text-gray-900">Get Started</h2>
                <p className="text-gray-600">Create your free account</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`w-full rounded-lg border bg-zinc-50 px-3.5 py-2.5 text-gray-800 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-400 transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    className={`w-full rounded-lg border bg-zinc-50 px-3.5 py-2.5 text-gray-800 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-400 transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className={`w-full rounded-lg border bg-zinc-50 px-3.5 py-2.5 text-gray-800 ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-400 transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-green-600 px-4 py-2.5 font-medium text-white transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            </div>

            <div className="mt-auto pt-6 text-center">
              <Link
                href="/login"
                className="text-sm font-medium text-green-600 transition-colors hover:text-green-800">
                Already have an account? Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
