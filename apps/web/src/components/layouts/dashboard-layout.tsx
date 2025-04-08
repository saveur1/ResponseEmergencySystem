import SideNav from '@/components/dashboard/sidebar'
import TopBar from '@/components/dashboard/TopBar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom'
import ProtectedRoute from './protected-route';

const AdminLayout = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
        <SidebarProvider>
        <div className="flex w-full h-screen overflow-hidden">
            <SideNav />
            <SidebarInset className="flex flex-col w-0 flex-1 overflow-hidden bg-red-700">
            <div className="sticky top-0 z-50">
                <TopBar />
            </div>
            <div className="flex-1 overflow-hidden">
                <main className="h-full overflow-y-auto overflow-x-auto bg-gray-50 dark:bg-gray-900">
                <div className="w-full pb-4">
                    <Outlet />
                </div>
                </main>
            </div>
            </SidebarInset>
        </div>
        </SidebarProvider>
    </ProtectedRoute>
  )
}

export default AdminLayout
