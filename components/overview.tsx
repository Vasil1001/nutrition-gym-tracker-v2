/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowUpFromLine, Clock, User } from 'lucide-react'
import { SVGProps } from 'react'
import { LineChartWeights } from './charts/LineChart'

export function Dashboard() {
  return (
    <div className="flex max-h-screen w-full flex-col">
      <main className="flex flex-col gap-4 md:gap-5 ">
        <div className="mx-auto flex w-full items-center gap-4">
          <form className="flex-1">
            <Input className="bg-white" placeholder="Search..." />
            <Button className="sr-only" type="submit">
              Submit
            </Button>
          </form>
        </div>

        <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-3">
          <Card className="col-span-1 flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center gap-4 px-3.5">
              <User height={48} width={48} />
              <div className="grid gap-1">
                <CardTitle>John Doe</CardTitle>
                <CardDescription>Software Engineer</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-1.5">
              <div className="font-semibold tracking-tight">Current stats</div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <GitBranchIcon className="h-4 w-4 " />
                  <span className="">63kg</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="">2x / week</span>
                </div>
              </div>

              <div className="mt-2 font-semibold tracking-tight">Set goals</div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <GitBranchIcon className="h-4 w-4 " />
                  <span className="">66kg</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="">3x / week</span>
                </div>
              </div>
              <div className="ml-0.5 text-[0.70rem] uppercase text-muted-foreground">
                Conducted so far
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2 flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center gap-4 px-3.5">
              <ArrowUpFromLine className="h-12 w-12" />
              <div className="grid gap-1">
                <CardTitle>Set your targets</CardTitle>
                <CardDescription>Nutrition and gym targets</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col items-center justify-end gap-4">
              <div className="flex w-full flex-1 gap-4 rounded-xl">
                <div className="flex w-full flex-1 rounded-xl bg-[#24252b] p-4">
                  <div className="flex w-full flex-col">
                    <p className="mb-2">Weight</p>
                    <Button className="w-full" type="submit">
                      Set weight
                    </Button>
                  </div>
                </div>
                <div className="rounded-xl bg-[#24252b] p-4">Protein</div>
                <div className="rounded-xl bg-[#24252b] p-4">Calories</div>
              </div>
              <Button className="w-full" type="submit">
                Set your targets
              </Button>
            </CardContent>
          </Card>

          <div className="col-span-3">
            <LineChartWeights />
          </div>
          {/* <Card className="col-span-1 flex flex-col justify-between">
            <CardContent className="flex flex-col items-center justify-end gap-4">
              <PieChartJobs />
            </CardContent>
          </Card> */}
        </div>
      </main>
    </div>
  )
}

function GitBranchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  )
}
