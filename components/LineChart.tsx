import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

const data = [
  {
    average: 4,
    today: 4
  },
  {
    average: 7,
    today: 7
  },
  {
    average: 6,
    today: 10
  },
  {
    average: 4,
    today: 7
  },
  {
    average: 7,
    today: 8
  },
  {
    average: 6,
    today: 10
  },
  {
    average: 6,
    today: 12
  },
  {
    average: 6,
    today: 14
  },
  {
    average: 6,
    today: 21
  },
  {
    average: 6,
    today: 27
  }
]

export function LineChartWeights() {
  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader>
        <CardTitle>Applications Chart</CardTitle>
        <CardDescription>Line chart with the amount of applications sent per day</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <div className="h-full min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 15,
                right: 10,
                left: -30,
                bottom: 0
              }}>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Average
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Today
                            </span>
                            <span className="font-bold">{payload[0].value}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return null
                }}
              />
              <XAxis dataKey="name" />
              <YAxis domain={['dataMin - 4', 'dataMax + 4']} />
              <CartesianGrid opacity={0.1} strokeDasharray="4 5" />
              <Line
                type="monotone"
                dataKey="today"
                strokeWidth={2.5}
                dot={{ r: 3 }}
                activeDot={{
                  r: 4,
                  style: { fill: 'var(--theme-primary)' }
                }}
              />
              <Line
                type="monotone"
                dot={false}
                strokeWidth={3}
                strokeOpacity={0.3}
                activeDot={false}
                dataKey="average"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
