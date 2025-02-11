import { Card, CardContent } from '@/components/ui/card'

export default function FoodCardSkeleton() {
  return (
    <div>
      <Card className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-card/50">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-muted/10 to-transparent" />
        <CardContent className="flex flex-1 flex-col rounded-xl p-3 text-base">
          <div className="flex flex-1 flex-col">
            <div className="mb-2">
              <div className="flex items-start justify-between">
                <div className="flex">
                  <div className="flex text-xs lg:text-[15px]">
                    <div className="h-4 w-24 animate-pulse rounded bg-muted/60"></div>
                  </div>
                </div>
                <div className="relative z-10 flex shrink-0 items-end gap-0.5">
                  <div className="h-5 w-5 animate-pulse rounded bg-muted/60"></div>
                </div>
              </div>
              <div className="mt-1">
                <div className="-mt-0.5 h-3 w-20 animate-pulse rounded bg-muted/60"></div>
              </div>
            </div>
            <div className="mt-auto flex items-center justify-evenly gap-4">
              <div className="flex flex-1 flex-col items-center rounded-sm border border-[#19191f] p-1">
                <div className="h-3 w-8 animate-pulse rounded bg-muted/60"></div>
                <div className="mt-1 h-3 w-6 animate-pulse rounded bg-muted/60"></div>
              </div>
              <div className="flex flex-1 flex-col items-center rounded-sm border border-[#19191f] p-1">
                <div className="h-3 w-8 animate-pulse rounded bg-muted/60"></div>
                <div className="mt-1 h-3 w-6 animate-pulse rounded bg-muted/60"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
