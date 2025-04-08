import ProfileComponent from '@/components/auth/profile-component';

const AdminProfile = () => {
    return (
        <ProfileComponent updatePageRedirectUrl="/dashboard/profile/update"/>
    )
}

export default AdminProfile;