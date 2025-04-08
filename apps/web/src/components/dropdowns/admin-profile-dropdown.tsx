import { ChevronDown, LogOut, Settings, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useContext } from 'react';
import { AuthContext } from '@/Context/user-context';
import { Link } from 'react-router-dom';

const AdminProfileDropdown = () => {

    const authContext = useContext(AuthContext);
    if(!authContext){
        throw new Error("Context should be used in Context Provider");
    }

    const { user, logout } = authContext;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 flex items-center gap-2 rounded-full"
                >
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage src={user?.profileImageUrl || "/avatar.png"} alt="User" />
                        <AvatarFallback>{ user?.fullName.at(0) }</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                        <p className="text-sm font-medium">{ user?.fullName }</p>
                        <p className="text-xs text-muted-foreground">{ user?.role }</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link to="/dashboard/profile">
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link to="/dashboard/settings" className="cursor-pointer">
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={ async() => await logout() }>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AdminProfileDropdown