import React, { useContext, useEffect, useState } from 'react';
import { UserShape } from 'types';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'utils/firebase';
import { AuthContext } from 'Context/user-context';

const UpdateProfileCard = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) return null;

    const { user, setUser } = authContext;

    const [name, setName] = useState(user?.fullName);
    const [email, setEmail] = useState(user?.email);;
    const [avatar, setAvatar] = useState<File | null>(null);
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/upload`;
    const [imagePreview, setImagePreview] = useState<string | null>(user?.profileImageUrl || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const uploadImageToCloudinary = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);
        formData.append('folder', 'profile_pictures');

        const response = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload image to Cloudinary');
        }

        const data = await response.json();
        return data.secure_url;
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (user) {
            const updateUserProfile = async () => {
                try {
                    setLoading(true);
                    let avatarUrl = user.profileImageUrl;

                    if (avatar) {
                        avatarUrl = await uploadImageToCloudinary(avatar);
                    }

                    if (!user.id) {
                        throw new Error('User ID is undefined');
                    }
                    const userDocRef = doc(db, 'users', user.id!);

                    await updateDoc(userDocRef, {
                        fullName: name,
                        email: email,
                        profileImageUrl: avatarUrl,
                    });

                    // Update the user context
                    setUser({
                        ...user,
                        fullName: name,
                        email: email,
                        profileImageUrl: avatarUrl,
                    } as UserShape);

                    navigate('/profile');
                } catch (error) {
                    console.error('Error updating profile:', error);
                    setError('Failed to update profile. Please try again.');
                } finally {
                    setLoading(false);
                }
            };

            updateUserProfile();
        }
    };

    return (
        <div className="min-h-screen flex items-start justify-center pt-20 bg-gray-100">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Update Your Profile
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Name input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Email input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Avatar uploader */}
                    <div className="flex items-center space-x-6">
                        <div className="shrink-0">
                            <img
                                id="preview_img"
                                className="h-16 w-16 object-cover rounded-full"
                                src={imagePreview || "/avatar.png"}
                                alt="Current profile photo"
                            />
                        </div>
                        <label className="block">
                            <span className="sr-only">Choose profile photo</span>
                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setAvatar(file);
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            setImagePreview(reader.result as string);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100
                                "
                            />
                        </label>
                    </div>
                    {error && (
                        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileCard;