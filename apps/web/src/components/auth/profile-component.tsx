import ChangePasswordModal from 'components/modals/ChangePasswordModal';
import { AuthContext } from 'Context/user-context';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

interface UpdateProps {
    updatePageRedirectUrl: string
}
const ProfileComponent = ({ updatePageRedirectUrl }: UpdateProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const authContext = useContext(AuthContext);
    if(!authContext) return null;
    
    const { user } = authContext;

    const handleChangePassword = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="flex flex-col items-center pt-16 bg-gray-50 px-4 max-md:pb-10">
        <h1 className="text-3xl font-semibold mb-10">My Profile</h1>

        <div className="flex flex-col md:flex-row justify-between rounded-xl p-8 border w-full md:w-3/4 bg-red-200/10 shadow-lg max-w-5xl gap-10">
            {/* Left Section - Profile Image + Edit */}
            <div className="flex flex-col justify-center max-md:items-center space-y-6 md:w-1/2">
                <img
                    src={ user?.profileImageUrl || "/avatar.png"}
                    alt="Profile"
                    className="w-64 h-64 object-cover object-top rounded-full bottom-0"
                />
            <Link
                to={ updatePageRedirectUrl }
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-center md:w-1/2 text-white rounded-md transition"
            >
                Edit Profile
            </Link>
            </div>

            {/* Right Section - Details */}
            <div className="flex-1 relative space-y-6 md:w-1/2">
            <div>
                <h2 className="text-lg font-semibold text-gray-700">Full Name</h2>
                <p className="text-gray-800">{ user?.fullName || "Joe Doe"}</p>
            </div>

            <div>
                <h2 className="text-lg font-semibold text-gray-700">Email Address</h2>
                <p className="text-gray-800">{ user?.email || "joedoe@gmail.com"}</p>
            </div>

            <div>
                <h2 className="text-lg font-semibold text-gray-700">Role</h2>
                <p className="text-gray-800 capitalize">{ user?.role }</p>
            </div>

            <button
                onClick={handleChangePassword}
                className="md:w-1/2 px-6 py-2 bg-blue-600 hover:bg-blue-700 md:absolute md:bottom-1 text-white rounded-md transition"
            >
                Change Password
            </button>
            </div>
        </div>

        {/* Password Modal */}
        {isModalOpen && (
            <ChangePasswordModal handleCloseModal={ handleCloseModal }/>
        )}
        </div>
    );
}

export default ProfileComponent