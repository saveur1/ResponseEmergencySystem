import { UserShape } from '@/types'
import { Gauge, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface ProfileProps {
    user: UserShape | undefined;
    logout: () => Promise<void>;
}

const UserProfileDropdown = ({ user, logout }: ProfileProps) => {

    const navigate = useNavigate();

    const handleLogout = async() => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="absolute top-[75px] left-2 w-48 bg-white rounded shadow-md py-2 text-gray-800 hidden group-hover:block z-10">
            { user?.role === "admin" &&
                (<Link to = "/dashboard"
                    className="px-4 py-2 hover:bg-gray-100 flex gap-2 transition cursor-pointer"
                    onClick={() => navigate("/profile")}
                    >
                    <Gauge size={ 18 } className="text-gray-500"/>
                    Dashboard
                </Link>)} 
            <div
                className="px-4 py-2 hover:bg-gray-100 flex gap-2 transition cursor-pointer"
                onClick={() => navigate("/profile")}
                >
                <User size={ 18 } className="text-gray-500"/>
                My Profile
            </div>
            <div
                className="px-4 py-2 hover:bg-gray-100 flex gap-2 transition cursor-pointer"
                onClick={handleLogout}
                >
                    <LogOut size={ 18 } className="text-gray-500"/>
                    Logout
            </div>
        </div>
    )
}

export default UserProfileDropdown