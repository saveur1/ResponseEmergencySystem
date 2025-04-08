import ProfileComponent from '@/components/auth/profile-component';

const UserProfile = () => {

    return (
        <ProfileComponent updatePageRedirectUrl='/profile/update'/>
    );
};

export default UserProfile;