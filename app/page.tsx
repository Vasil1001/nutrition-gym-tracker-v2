'use client'

import BarChartGoal from '@/components/charts/BarChartGoal'
import { Dashboard } from '@/components/ui/overview/overview'
import { LineChartWeights } from '@/components/charts/LineChart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Container from '@/components/ui/container'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import Onboarding from '@/components/ui/overview/onboarding/onboarding'
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
            {/* {showOnboarding && (<Onboarding />)} */}
            {showOnboarding && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-[black] bg-opacity-50">
                <div className="relative w-full max-w-md rounded-lg bg-[#34343f] p-6 shadow-lg">
                  <button
                    onClick={handleCloseOnboarding}
                    className="absolute right-2 top-2 text-2xl text-gray-500 hover:text-gray-700">
                    &times;
                  </button>
                  <Onboarding />
                </div>
              </div>
            )}
          </div>
          
          {/* <div className="border-r border-[#19191f] bg-opacity-[0.6] p-2 text-center">
            <div className="text-3xl font-bold tracking-tighter">1700C</div>
            <div className="ml-1 mt-0.5 text-[0.70rem] uppercase text-muted-foreground">
              Calories/day
            </div>
          </div>

          <div className="border-r border-[#19191f] bg-opacity-[0.6] p-2 text-center">
            <div className="text-3xl font-bold tracking-tighter">100g</div>
            <div className="ml-1 mt-0.5 text-[0.70rem] uppercase text-muted-foreground">
              Protein/day
            </div>
          </div>

          <div className="border-r border-[#19191f] bg-opacity-[0.6] p-2 text-center">
            <div className="text-3xl font-bold tracking-tighter">3 x</div>
            <div className="ml-1 mt-0.5 text-[0.70rem] uppercase text-muted-foreground">
              Gym/week
            </div>
          </div> */}
        </CardContent>
      </Card>
      <Dashboard />
    </div>
  )
}

{
  /* <div className="">
          <div className="my-6 text-3xl font-bold tracking-tighter">Dashboard</div>
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1 flex w-full gap-6">
              <Card className="col-span-2 flex h-full flex-col">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>Main targets to accompany gym journey</CardDescription>
                </CardHeader>
                <CardContent className="flex h-full justify-between gap-6 pb-4">
                  <div className="rounded-lg  bg-opacity-[0.6] p-2 text-center">
                    <div className="text-3xl font-bold tracking-tighter">1700C</div>
                    <div className="ml-1 mt-0.5 text-[0.70rem] uppercase text-muted-foreground">
                      Calories/day
                    </div>
                  </div>

                  <div className="rounded-lg bg-opacity-[0.6] p-2 text-center">
                    <div className="text-3xl font-bold tracking-tighter">100g</div>
                    <div className="ml-1 mt-0.5 text-[0.70rem] uppercase text-muted-foreground">
                      Protein/day
                    </div>
                  </div>

                  <div className="rounded-lg bg-opacity-[0.6] p-2 text-center">
                    <div className="text-3xl font-bold tracking-tighter">3 x</div>
                    <div className="ml-1 mt-0.5 text-[0.70rem] uppercase text-muted-foreground">
                      Gym/week
                    </div>
                  </div>
                </CardContent>
              </Card>
              <BarChartGoal />
            </div>
          </div>
        </div> */
}
