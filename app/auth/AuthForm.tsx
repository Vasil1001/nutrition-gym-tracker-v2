import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface AuthFormData {
  email: string
  password: string
  confirmPassword?: string
}

interface AuthFormProps {
  onSubmit: (data: AuthFormData) => void | Promise<void>
  isSubmitting: boolean
  submitText: string
  showConfirm?: boolean
}

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  isSubmitting,
  submitText,
  showConfirm = false
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<AuthFormData>()

  const internalSubmit: SubmitHandler<AuthFormData> = (data) => {
    onSubmit(data)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(internalSubmit)}>
      {/* Email */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Email address</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className={`w-full rounded-lg border bg-zinc-50 px-3.5 py-2.5 text-gray-800 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } transition-all placeholder:text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500`}
          placeholder="name@company.com"
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      {/* Password */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' }
          })}
          className={`w-full rounded-lg border bg-zinc-50 px-3.5 py-2.5 text-gray-800 ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          } transition-all placeholder:text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500`}
          placeholder={showConfirm ? '6+ characters' : 'Enter your password'}
        />
        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
      </div>
      {/* Confirm Password */}
      {showConfirm && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === getValues('password') || 'Passwords do not match'
            })}
            className={`w-full rounded-lg border bg-zinc-50 px-3.5 py-2.5 text-gray-800 ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            } transition-all placeholder:text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500`}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-green-600 px-4 py-2.5 font-medium text-white transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        {isSubmitting ? 'Processing...' : submitText}
      </button>
    </form>
  )
}

export default AuthForm
