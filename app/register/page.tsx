'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { FruitBowlIcon } from '@/components/icons/FruitBowlIcon'
import { defaultFoods } from '@/seed-foods'
import AuthForm from '@/app/auth/AuthForm'

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const router = useRouter()

  const handleRegister = async (data: {
    email: string
    password: string
    confirmPassword?: string
  }) => {
    setIsSubmitting(true)
    setServerError(null)
    try {
      // Check if the email is already registered
      const res = await fetch('/api/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email })
      })
      const result = await res.json()
      if (result.exists) {
        throw new Error('Email is already registered')
      }

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
      })
      if (signUpError) {
        // Fallback check if error indicates duplicate email
        if (signUpError.message.toLowerCase().includes('already')) {
          throw new Error('Email is already registered')
        }
        throw signUpError
      }

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
        }
      }
      router.push('/login')
    } catch (error: any) {
      setServerError(error.message || 'Invalid credentials')
      console.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 px-4 backdrop-blur-lg">
      <div className="flex w-full max-w-3xl rounded-2xl bg-white/80 shadow-xl backdrop-blur-sm xl:h-[750px]">
        {/* Left side - hidden on mobile */}
        <div className="hidden max-w-[250px] items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-12 md:flex lg:max-w-xs">
          <div className="space-y-6 text-center text-white">
            <div className="rounded-2xl bg-white/20 p-2 backdrop-blur-sm">
              <div className="mx-auto mb-3 h-24 w-24 rounded-xl border-2 border-dashed bg-white/30 p-5 lg:h-32 lg:w-32">
                <FruitBowlIcon />
              </div>
              <h3 className="text-md mb-2 font-medium tracking-tight">Nutrition</h3>
              <p className="text-xs opacity-90">Start your journey today</p>
            </div>
          </div>
        </div>

        {/* Right side with increased width */}
        <div className="flex flex-1 bg-white p-6 md:p-12">
          <div className="mx-auto flex w-full max-w-lg flex-col">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-3xl font-bold text-gray-900">Register</h2>
              <p className="text-md text-gray-600">Create your free account</p>
            </div>
            {/* Use reusable AuthForm with confirm password */}
            <AuthForm
              onSubmit={handleRegister}
              isSubmitting={isSubmitting}
              submitText="Create account"
              showConfirm={true}
              fieldError={serverError ? { field: 'email', message: serverError } : undefined}
            />
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-sm font-medium text-green-600 transition-colors hover:text-green-800">
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
