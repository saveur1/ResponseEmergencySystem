import { Link, useLocation } from 'react-router-dom'
import {
  BarChart3,
  Bell,
  FileText,
  Flame,
  LifeBuoy,
  Settings,
  Shield,
  Users
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator
} from '@/components/ui/sidebar'

export default function SideNav() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar className="border-r border-border">
        <SidebarHeader className="pb-0">
          <div className="flex items-center px-2 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-red-600 text-white">
              <Bell className="h-6 w-6" />
            </div>
            <div className="ml-2">
              <h3 className="font-semibold text-lg">Emergency</h3>
              <p className="text-xs text-muted-foreground">Response System</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPath === '/dashboard'}
                  >
                    <Link to="/dashboard">
                      <BarChart3 className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPath.includes('/users')}
                  >
                    <Link to="/dashboard/users">
                      <Users className="h-4 w-4" />
                      <span>Users</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPath.includes('/emergencies')}
                  >
                    <Link to="/dashboard/emergencies">
                      <Bell className="h-4 w-4" />
                      <span>Emergencies</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Emergency Types</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPath.includes('/fire')}
                  >
                    <Link to="/dashboard/fire">
                      <Flame className="h-4 w-4 text-red-600" />
                      <span>Fire</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPath.includes('/assault')}
                  >
                    <Link to="/dashboard/assault">
                      <Shield className="h-4 w-4 text-orange-600" />
                      <span>Assault</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPath.includes('/flood')}
                  >
                    <Link to="/dashboard/flood">
                      <LifeBuoy className="h-4 w-4 text-blue-600" />
                      <span>Flood</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>System</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPath.includes('/settings')}
                  >
                    <Link to="/dashboard/settings">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPath.includes('/reports')}
                  >
                    <Link to="/dashboard/reports">
                      <FileText className="h-4 w-4" />
                      <span>Reports</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="px-3 py-2">
            <p className="text-xs text-muted-foreground">
              Emergency Response System v1.0
            </p>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}

