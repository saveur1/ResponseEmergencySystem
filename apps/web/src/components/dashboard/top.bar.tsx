'use client'

import { useState } from 'react'
import { Bell, ChevronDown, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'

interface TopBarProps {
  userMenuOpen: boolean
  setUserMenuOpen: (open: boolean) => void
}

export function TopBar({ userMenuOpen, setUserMenuOpen }: TopBarProps) {
  const [notifications, setNotifications] = useState(3)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-64 rounded-lg bg-background pl-8 md:w-80"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={() => setNotifications(0)}
        >
          <Bell className="h-5 w-5" />
          {notifications > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-medium text-white">
              {notifications}
            </span>
          )}
        </Button>
        <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start text-sm md:flex">
                <span className="font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">
                  Administrator
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
