import {
  Bell,
  BarChart3,
  Users,
  Settings,
  Home,
  Phone,
  FileText
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import {
  SidebarHeader,
  Sidebar,
  SidebarSeparator,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from '../ui/sidebar'
import { useEffect, useState } from 'react'

export default function SideNav() {
  const location = useLocation()
  const currentPath = location.pathname
  const [role, setRole] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  // const { state: isCollapsed } = useSidebar()

  useEffect(() => {
    const userRole = localStorage.getItem('userRole')
    if (userRole) {
      setRole(userRole)
    } else {
      setRole('baby')
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    )
  }

  return (
    <>
      {role === 'admin' ? (
        <AdminSidebar currentPath={currentPath} />
      ) : (
        <BabySidebar currentPath={currentPath} />
      )}
    </>
  )
}

function AdminSidebar({ currentPath }: { currentPath: string }) {
  return (
    <Sidebar variant="inset" className="border-r border-border">
      <SidebarHeader className="pb-0">
        <div className="flex items-center px-2 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-red-600 text-white">
            <Bell className="h-6 w-6" />
          </div>
          <div className="ml-2">
            <h1 className="text-xl font-bold text-white">BabyCare</h1>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={currentPath === '/admin'}>
                  <Link to="/admin">
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
                    <span>Invitations</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={currentPath.includes('/families')}
                >
                  <Link to="/admin/families">
                    <Bell className="h-4 w-4" />
                    <span>Families</span>
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
                  <Link to="/admin/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
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
            Baby care monitoring system v1.0
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

// baby Sidebar Component
function BabySidebar({ currentPath }: { currentPath: string }) {
  return (
    <Sidebar variant="inset" className="border-r border-border">
      <SidebarHeader className="pb-0">
        <div className="flex items-center px-2 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-600 text-white">
            <Home className="h-6 w-6" />
          </div>
          <div className="ml-2">
            <h3 className="font-semibold text-lg">BabyCare</h3>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={currentPath === '/baby'}>
                  <Link to="/baby">
                    <Home className="h-4 w-4" />
                    <span>baby</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={currentPath.includes('/baby')}
                >
                  <Link to="/baby/profile">
                    <Bell className="h-4 w-4" />
                    <span>Baby profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={currentPath.includes('/help')}
                >
                  <Link to="/baby/help">
                    <Phone className="h-4 w-4" />
                    <span>Help center</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={currentPath.includes('/')}
                >
                  <Link to="/">
                    <Settings className="h-4 w-4" />
                    <span>logout</span>
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
            baby Emergency Portal v1.0
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
