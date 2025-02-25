'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { NutritionIcon } from '@/components/icons/NutritionIcon'
import AuthForm from '@/app/auth/AuthForm'

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGuestLoading, setIsGuestLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsSubmitting(true)
    setServerError(null)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      })
      if (error) throw error
      router.push('/')
    } catch (error: any) {
      setServerError(error.message || 'Invalid credentials')
      console.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGuestLogin = async () => {
    setIsGuestLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: process.env.NEXT_PUBLIC_GUEST_EMAIL || '',
        password: process.env.NEXT_PUBLIC_GUEST_PASSWORD || ''
      })
      if (error) throw error
      router.push('/')
    } catch (error: any) {
      console.error('Guest login failed. Please try again.')
    } finally {
      setIsGuestLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 px-4 backdrop-blur-lg">
      <div className="flex h-[600px] w-full max-w-3xl rounded-2xl bg-white/80 shadow-xl backdrop-blur-sm">
        {/* Left side - hidden on mobile */}
        <div className="hidden max-w-xs items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-12 md:flex">
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

        {/* Right side with increased width */}
        <div className="flex flex-1 bg-white p-6 md:p-12">
          <div className="mx-auto flex w-full max-w-lg flex-col">
            <div className="flex-1">
              <div className="mb-6 text-center">
                <h2 className="mb-2 text-4xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-gray-600">Sign in to continue</p>
              </div>
              {/* Server Error */}
              {serverError && (
                <div className="mb-4 text-center text-sm text-red-600">{serverError}</div>
              )}
              {/* Use reusable AuthForm without confirm field */}
              <AuthForm onSubmit={handleLogin} isSubmitting={isSubmitting} submitText="Sign In" />
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-500">OR</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleGuestLogin}
                disabled={isGuestLoading}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                {isGuestLoading ? 'Loading...' : 'Continue as Guest'}
              </button>
            </div>
            <div className="mt-6 pb-6 text-center">
              <Link
                href="/register"
                className="text-sm font-medium text-green-600 transition-colors hover:text-green-800">
                Need an account? Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
