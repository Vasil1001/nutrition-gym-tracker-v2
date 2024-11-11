'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dashboard } from '@/components/ui/overview/overview'

import { useState } from 'react'

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  const handleSetTargetsClick = () => {
    setShowOnboarding(true)
  }

  const handleCloseOnboarding = () => {
    setShowOnboarding(false)
  }
  return (
    <div>
      <div className="my-6 text-3xl font-bold tracking-tighter">Dashboard</div>
      <Card className="mb-4 flex h-full flex-col">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Main targets to accompany gym journey</CardDescription>
        </CardHeader>
        <CardContent className="flex h-full pb-4">
          <div className="container mx-auto">
            {/* Other components */}
            <button
              onClick={handleSetTargetsClick}
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
              Set Targets
            </button>

            {showOnboarding && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-[black] bg-opacity-50">
                <div className="relative w-full max-w-md rounded-lg bg-[#34343f] p-6 shadow-lg">
                  <button
                    onClick={handleCloseOnboarding}
                    className="absolute right-2 top-2 text-2xl text-gray-500 hover:text-gray-700">
                    &times;
                  </button>
                  {/* <Onboarding /> */}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Dashboard />
    </div>
  )
}
