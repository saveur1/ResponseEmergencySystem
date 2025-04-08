import { Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const AdminNotificationsDropdown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                variant="outline"
                size="icon"
                className="relative rounded-full"
                >
                <Bell className="h-4 w-4" />
                <Badge className="absolute -right-1 -top-1 h-5 w-5  rounded-full bg-red-600 hover:bg-red-600 p-0 text-[10px] flex justify-center items-center  text-white">3</Badge>
                <span className="sr-only">Notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px] bg-white rounded-[10px]">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-auto">
                <DropdownMenuItem className="cursor-pointer">
                    <div className="flex items-start gap-2">
                        <Badge className="mt-1 h-2 w-2 rounded-full bg-red-600 p-0" />
                        <div>
                            <p className="font-medium">New Fire Emergency</p>
                            <p className="text-sm text-muted-foreground">Reported at Kigali Height</p>
                            <p className="text-xs text-muted-foreground">2 minutes ago</p>
                        </div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    <div className="flex items-start gap-2">
                    <Badge className="mt-1 h-2 w-2 rounded-full bg-red-600 p-0" />
                    <div>
                        <p className="font-medium">Assault Emergency</p>
                        <p className="text-sm text-muted-foreground">
                        Reported at Downtown
                        </p>
                        <p className="text-xs text-muted-foreground">
                        15 minutes ago
                        </p>
                    </div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    <div className="flex items-start gap-2">
                    <Badge className="mt-1 h-2 w-2 rounded-full bg-red-600 p-0" />
                    <div>
                        <p className="font-medium">Flood Warning</p>
                        <p className="text-sm text-muted-foreground">
                        Reported at Nyamirambo
                        </p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                    </div>
                </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                asChild
                className="cursor-pointer justify-center text-center"
                >
                <Link to="/dashboard/notifications">View all notifications</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AdminNotificationsDropdown