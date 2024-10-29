import React, { useState } from 'react'

function Step1({ onNext }: any) {
  const [sex, setSex] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (sex && Number(weight) > 0 && Number(height) > 0) {
      onNext({ sex, weight: Number(weight), height: Number(height) })
    } else {
      alert('Please fill all fields with valid values.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold">Step 1: Basic Information</h2>
      <div className="space-y-2">
        <label className="block">
          Sex:
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label className="block">
          Weight (lbs):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="1"
            required
            className="mt-1 block w-full rounded-md border border-gray-300"
          />
        </label>
        <label className="block">
          Height (inches):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min="1"
            required
            className="mt-1 block w-full rounded-md border border-gray-300"
          />
        </label>
      </div>
      <button type="submit" className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
        Next
      </button>
    </form>
  )
}

export default Step1
