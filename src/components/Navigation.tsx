'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Activity, LayoutDashboard, Ticket, Wifi } from "lucide-react"

const Navigation = () => {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">CX Dashboard</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth",
                isActive("/")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Activity className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link
              href="/tickets"
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth",
                isActive("/tickets")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Ticket className="h-4 w-4" />
              <span>Tickets</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
