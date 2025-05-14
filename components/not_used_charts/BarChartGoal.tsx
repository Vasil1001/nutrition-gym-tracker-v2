import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Minus, Plus } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer } from 'recharts'

const data = [
  {
    goal: 400
  },
  {
    goal: 300
  },
  {
    goal: 200
  },
  {
    goal: 300
  },
  {
    goal: 200
  },
  {
    goal: 278
  },
  {
    goal: 189
  },
  {
    goal: 239
  },
  {
    goal: 300
  },
  {
    goal: 200
  },
  {
    goal: 278
  },
  {
    goal: 189
  },
  {
    goal: 349
  },
  {
    goal: 400
  },
  {
    goal: 300
  },
  {
    goal: 200
  },
  {
    goal: 300
  }
]

type Props = {}

function BarChartGoal({}: Props) {
  const [goal, setGoal] = useState(1700)

  function onClick(adjustment: number) {
    setGoal(Math.max(700, Math.min(3000, goal + adjustment)))
  }
  return (
    <Card className="flex flex-1 flex-col justify-between selection:h-full">
      <CardHeader>
        <CardTitle>Daily Calories Goal</CardTitle>
        <CardDescription>Set your daily calorie intake goal.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(-100)}
            disabled={goal <= 700}>
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="text-7xl font-bold tracking-tighter">{goal}</div>
            <div className="text-[0.70rem] uppercase text-muted-foreground">Calories/day</div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(100)}
            disabled={goal >= 3000}>
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
        <div className="mt-3 h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar
                dataKey="goal"
                radius={3}
                style={
                  {
                    fill: 'hsl(var(--foreground))',
                    opacity: 0.9
                  } as React.CSSProperties
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mx-1.5">
          <Button className="mt-5 w-full text-base font-bold">Set Calorie Goal</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarChartGoal
