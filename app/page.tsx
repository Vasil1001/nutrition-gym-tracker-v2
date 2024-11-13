'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dashboard } from '@/components/ui/overview/overview'

import { useState } from 'react'

export default function Home() {
  return (
    <div>
      <div className="my-6 text-3xl font-bold tracking-tighter">Dashboard</div>
      <Card className="mb-4 flex h-full flex-col">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Main targets to accompany gym journey</CardDescription>
        </CardHeader>
      </Card>
      <Dashboard />
    </div>
  )
}
