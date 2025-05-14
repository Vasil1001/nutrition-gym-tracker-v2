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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { useState } from 'react'

type Session = {
  weight: number
  date: string
}

const data = [
  {
    weight: 25,
    date: '12/03/24'
  },
  {
    weight: 27,
    date: '15/03/24'
  },
  {
    weight: 32,
    date: '18/03/24'
  }
]

export function LineChartWeights() {
  const [chartData, setChartData] = useState(data)

  const addEntry = (session: Session) => {
    console.log(session)
    // TODO: Console log the type of weight.date
    console.log(typeof session.date)
    const newEntry = {
      weight: Math.round(session.weight), // Ensure no decimals
      date: session.date // Format the date
    }
    setChartData([...chartData, newEntry])
  }

  const calculateAverageWeight = (data: string | any[]) => {
    let sum = 0
    for (let i = 0; i < data.length; i++) {
      sum += data[i].weight
    }
    return sum / data.length
  }

  const averageWeight = calculateAverageWeight(data)
  return (
    <Card className="flex h-[500px] flex-col">
      <CardHeader>
        <CardTitle className="flex gap-1">
          Gym Chart
          <button
            onClick={() =>
              addEntry({
                weight: 45,
                date: '15/12/12'
              })
            }
            className="text-xs font-normal text-muted-foreground">
            Add Entry
          </button>
        </CardTitle>
        <CardDescription className="flex"></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4 text-xs">
        <div className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
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
                        <div className="">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Weight
                            </span>
                            <span className="font-bold ">{payload[0]?.value} KG</span>
                          </div>
                          {/* <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Date
                            </span>
                            <span className="font-bold ">{payload[0]?.payload.date}</span>
                          </div> */}
                        </div>
                      </div>
                    )
                  }

                  return null
                }}
              />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
              <CartesianGrid opacity={0.1} strokeDasharray="4 5" />
              <Line
                stroke="#22c55e"
                type="monotone"
                dataKey="weight"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '' }}
                activeDot={{
                  r: 5,
                  style: { fill: 'var(--theme-primary)' }
                }}
              />
              {/* <Line
                type="monotone"
                dataKey="date"
                strokeWidth={2.5}
                dot={{ r: 3 }}
                activeDot={{
                  r: 4,
                  style: { fill: 'var(--theme-primary)' }
                }}
              /> */}
              <Line
                type="basis"
                dot={false}
                strokeWidth={6}
                strokeOpacity={0.3}
                activeDot={false}
                dataKey={averageWeight}
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
