import { CardDescription, CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { ResponsiveLine } from '@nivo/line'
import { JSX, ClassAttributes, HTMLAttributes } from 'react'

export default function LineTwoChart() {
  return (
    <div className="-mt-6 grid gap-4 sm:grid-cols-2">
      <div className="flex flex-col">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
            <CardDescription>Daily Protein Intake</CardDescription>
          </CardHeader>
          <CardContent>
            <CurvedlineChart className="aspect-[4/3] w-full" />
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
            <CardDescription>Daily Calorie Intake</CardDescription>
          </CardHeader>
          <CardContent className="m-3 mt-0 rounded-xl bg-[#19191f]">
            <CurvedlineChart className="mt-4 aspect-[4/3] w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CurvedlineChart(
  props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>
) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: 'Desktop',
            data: [
              { x: 'Jan', y: 43 },
              { x: 'Feb', y: 137 },
              { x: 'Mar', y: 61 },
              { x: 'Apr', y: 145 },
              { x: 'May', y: 26 },
              { x: 'Jun', y: 154 }
            ]
          },
          {
            id: 'Mobile',
            data: [
              { x: 'Jan', y: 60 },
              { x: 'Feb', y: 48 },
              { x: 'Mar', y: 177 },
              { x: 'Apr', y: 78 },
              { x: 'May', y: 96 },
              { x: 'Jun', y: 204 }
            ]
          }
        ]}
        margin={{ top: 2, right: 2, bottom: 2, left: 2 }}
        xScale={{
          type: 'point'
        }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 250
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16
        }}
        colors={['#48ffeb', '#e11d48']}
        pointSize={7}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px',
              backgroundColor: '#2e3039'
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
              color: '#fff',
              backgroundColor: '#19191f'
            }
          },
          grid: {
            line: {
              stroke: '#535457'
            }
          }
        }}
        role="application"
      />
    </div>
  )
}
