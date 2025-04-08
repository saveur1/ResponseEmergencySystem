import AdminProfileDropdown from '../dropdowns/admin-profile-dropdown'
import AdminNotificationsDropdown from '../dropdowns/admin-notifications-dropdown'

export default function TopBar() {
    return (
        <div className="flex h-16 items-center justify-between border-b bg-white px-4">
            <div className="flex items-center gap-2 lg:gap-4">
                <div className="relative w-full max-w-[300px]">
                    <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <AdminNotificationsDropdown />
                <AdminProfileDropdown />
            </div>
        </div>
    )
}