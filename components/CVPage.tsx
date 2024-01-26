import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import react, { SVGProps } from 'react'
import SquareStackIcon from './icons/square-stack-icon'
import UserRoundIcon from './icons/user-round-icon'
import { ArrowUpFromLine, Clock, User } from 'lucide-react'
import { LineChartWeights } from './LineChart'
import { PieChartJobs } from './PieChart'

export function CVPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 md:gap-5 ">
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
              <div className="font-semibold">Total Applications</div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <GitBranchIcon className="h-4 w-4 " />
                  <span className="">43</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="">3h ago</span>
                </div>
              </div>

              <div className="mt-3 flex flex-col items-start gap-0 rounded-lg text-center text-sm">
                <div className="text-2xl font-bold tracking-tighter">2 Interviews</div>
                <div className="ml-0.5 text-[0.70rem] uppercase text-muted-foreground">
                  Conducted so far
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center gap-4 px-3.5">
              <ArrowUpFromLine className="h-12 w-12" />
              <div className="grid gap-1">
                <CardTitle>Upload CV</CardTitle>
                <CardDescription>Frontend Engineer CV</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col items-center justify-end gap-4">
              <div className="grid w-full max-w-sm items-center justify-center gap-1.5">
                <Input
                  id="cv"
                  type="file"
                  className="cursor-pointer border border-stone-700  hover:border-2 hover:border-stone-600"
                />
              </div>
              <Button className="w-full" type="submit">
                Upload CV
              </Button>
            </CardContent>
          </Card>
          <Card className="col-span-1 flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center gap-4 px-3.5">
              <ArrowUpFromLine className="h-12 w-12" />
              <div className="grid gap-1">
                <CardTitle>Upload Cover letter</CardTitle>
                <CardDescription>Frontend Engineer letter</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col items-center justify-end gap-4">
              <div className="grid w-full max-w-sm items-center justify-center gap-1.5">
                <Input
                  id="cover-letter"
                  type="file"
                  className="cursor-pointer border border-stone-700  hover:border-2 hover:border-stone-600"
                />
              </div>
              <Button className="w-full" type="submit">
                Upload Cover letter
              </Button>
            </CardContent>
          </Card>

          <div className="col-span-2">
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
