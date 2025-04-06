import SideNav from '@/components/dashboard/sidebar'
import TopBar from '@/components/dashboard/TopBar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen overflow-hidden">
        <SideNav />
        <SidebarInset className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="sticky top-0 z-50">
            <TopBar />
          </div>
          <div className="flex-1 overflow-hidden">
            <main className="h-full overflow-y-auto overflow-x-auto bg-gray-50 dark:bg-gray-900">
              <div className="w-full pb-4">{children}</div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
