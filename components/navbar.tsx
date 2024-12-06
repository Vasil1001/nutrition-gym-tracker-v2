'use client'

import { cn } from '@/lib/utils'
import { Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { useAuth } from '@/app/context/AuthContext'
import { supabase } from '@/lib/supabaseClient'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import User from './ui/icons/user-round-icon'
const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const { session } = useAuth()

  const routes = [
    {
      href: '/',
      label: 'Nutrition Tracking'
    },
    {
      href: '/weights',
      label: 'Weights'
    }
  ]

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error logging out:', error)
    } else {
      router.push('/login')
    }
  }

  return (
    <header className="border-b py-2 sm:flex sm:justify-between">
      <div className="relative grid h-16 w-full grid-cols-2 items-center md:grid-cols-3">
        {/* Mobile Navigation */}
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
                {!session ? (
                  <>
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
                  </>
                ) : (
                  <button onClick={handleLogout}>Logout</button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/">
            <h1 className="text-lg font-bold tracking-tighter">Nutrition Tracker</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="col-span-1 flex justify-end md:col-span-2">
          <nav className="hidden justify-center space-x-2 md:col-span-1 md:flex">
            {routes.map((route, i) => (
              <Button asChild variant="ghost" key={i}>
                <Link
                  href={route.href}
                  className={cn(
                    `text-sm font-medium transition-colors`,
                    pathname === route.href
                      ? 'bg-[#f4f4f5] dark:bg-[#2e3039]'
                      : 'hover:bg-[#f4f4f5] dark:hover:bg-[#2e3039]'
                  )}>
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="ml-2 flex">
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-md px-1 hover:bg-[#f2f4f5]/80  dark:hover:bg-[#2e3039]/80">
                <User />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {!session ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link className="cursor-pointer" href="/login">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link className="cursor-pointer" href="/register">
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="ml-2 bg-[#f4f4f5] hover:bg-[#f2f4f5]/80 dark:bg-[#2e3039] dark:hover:bg-[#2e3039]/80"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
