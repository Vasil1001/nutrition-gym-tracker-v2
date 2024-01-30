'use client'

import { cn } from '@/lib/utils'
import { Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

type Props = {}

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const routes = [
    {
      href: '/',
      label: 'Overview'
    },
    {
      href: '/weights',
      label: 'Weights'
    },
    {
      href: '/nutrition',
      label: 'Nutrition Tracking'
    }
  ]

  return (
    <header className="border-b py-2 sm:flex sm:justify-between">
      <div className="relative grid h-16 w-full grid-cols-2 items-center md:grid-cols-3">
        <div className="col-span-1 flex items-center">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6 md:hidden" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                {routes.map((route, i) => (
                  <Link href={route.href} key={i}>
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/">
            <h1 className="text-lg font-bold tracking-tighter">Nutrition Tracker</h1>
          </Link>
        </div>

        <div className="col-span-2 flex justify-end">
          <nav className="hidden justify-center space-x-2 md:col-span-1 md:flex">
            {routes.map((route, i) => (
              // eslint-disable-next-line react/jsx-key
              <Button asChild variant="ghost" key={i}>
                <Link
                  key={i}
                  href={route.href}
                  className={cn(
                    `text-sm font-medium transition-colors`,
                    pathname === route.href
                      ? 'bg-[#f4f4f5] hover:bg-[#f2f4f5]/60 dark:bg-[#2e3039] dark:hover:bg-[#2e3039]/50'
                      : 'dark:hover:bg-[#2e3039]/60'
                  )}>
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            className="ml-2 bg-[#f4f4f5] hover:bg-[#f2f4f5]/60 dark:bg-[#2e3039]  dark:hover:bg-[#2e3039]/50"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle Theme</span>
          </Button>
          {/* <ProfileButton /> */}
        </div>
      </div>
    </header>
  )
}

export default Navbar
