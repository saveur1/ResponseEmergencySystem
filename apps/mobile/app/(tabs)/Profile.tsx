import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { router } from 'expo-router';
import { AuthContext } from '../../Context/context';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import Svg, { Path } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';

const Profile = () => {
  const authContext = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [updating, setUpdating] = useState(false);
  const [profileImage, setProfileImage] = useState('');

  if (!authContext) {
    throw new Error('Auth context must be used within an AuthProvider');
  }

  const { logout, userData, isLoading, getUserData, updateUserProfile } =
    authContext;

  useEffect(() => {
    if (userData) {
      setFullname(userData.fullname);
      setEmail(userData.email);
    } else {
      fetchData();
    }
  }, [userData]);

  const fetchData = async () => {
    const data = await getUserData();
    if (data) {
      setFullname(data.fullname);
      setEmail(data.email);
    }
  };

  const handleUpdate = async () => {
    try {
      setUpdating(true);

      const uploadImageToCloudinary = async (uri: string) => {
        try {
          const formData = new FormData();
          formData.append('file', {
            uri: uri,
            type: 'image/jpeg',
            name: 'profile_image.jpg',
          } as unknown as Blob);

          const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_NAME;
          const uploadPreset = process.env.EXPO_PUBLIC_CLOUDINARY_PRESET;

          if (!cloudName || !uploadPreset) {
            console.error('Missing Cloudinary configuration');
            throw new Error('Cloudinary configuration is missing');
          }

          formData.append('upload_preset', uploadPreset);
          formData.append('folder', 'profile_pictures');

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
            {
              method: 'POST',
              body: formData,
              headers: {
                Accept: 'application/json',
              },
            }
          );

          const responseData = await response.json();

          if (!response.ok) {
            console.error('Cloudinary error:', responseData);
            throw new Error(
              responseData.error?.message || 'Failed to upload image'
            );
          }

          return responseData.secure_url;
        } catch (error) {
          console.error('Image upload error:', error);
          throw error;
        }
      };

      let profUrl = userData?.profUrl;
      if (profileImage) {
        profUrl = await uploadImageToCloudinary(profileImage);
      }

      const success = await updateUserProfile({
        fullname,
        profUrl,
      });

      if (success) {
        setIsEditing(false);
        showMessage({
          message: 'Profile updated successfully',
          type: 'success',
          icon: 'success',
          duration: 2000,
        });
      } else {
        showMessage({
          message: 'Failed to update profile',
          type: 'danger',
          icon: 'danger',
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showMessage({
        message: 'Failed to update profile',
        type: 'danger',
        icon: 'danger',
        duration: 2000,
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleSelectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    } else {
      console.log('User canceled image picker');
    }
  };

  const LogoutIcon = ({ size = 24, color = '#E02323' }) => (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7"
      />
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20H6a2 2 0 01-2-2V6a2 2 0 012-2h6"
      />
    </Svg>
  );

  const handleLogout = async () => {
    try {
      await logout();
      showMessage({
        message: 'Logged Out Successfully',
        type: 'success',
        icon: 'success',
        duration: 2000,
      });
      router.navigate('/Auth/login');
    } catch (error) {
      showMessage({
        message: 'Logout Failed',
        type: 'danger',
        icon: 'danger',
        duration: 2000,
      });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <FlashMessage position="top" />
        <Text style={styles.title}>User Profile</Text>

        {userData ? (
          <>
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri:
                    profileImage ||
                    userData.profUrl ||
                    'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png',
                }}
                style={styles.profileImage}
              />
              {isEditing && (
                <TouchableOpacity onPress={handleSelectImage}>
                  <Text className="text-center pt-2">Change Image</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.infoContainer}>
              {isEditing ? (
                <>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                      style={styles.input}
                      value={fullname}
                      onChangeText={setFullname}
                      placeholder="Enter your full name"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      style={[styles.input, styles.disabledInput]}
                      value={email}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      editable={false}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Role</Text>
                    <TextInput
                      style={[styles.input, styles.disabledInput]}
                      value={userData.role}
                      editable={false}
                    />
                  </View>

                  <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.cancelButton]}
                      onPress={() => {
                        setIsEditing(false);
                        setFullname(userData.fullname);
                        setEmail(userData.email);
                      }}
                    >
                      <Text style={styles.actionButtonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.actionButton, styles.saveButton]}
                      onPress={handleUpdate}
                      disabled={updating}
                    >
                      {updating ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={styles.actionButtonText}>Save</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Full Name:</Text>
                    <Text style={styles.infoValue}>{userData.fullname}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Email:</Text>
                    <Text style={styles.infoValue}>{userData.email}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Role:</Text>
                    <Text style={styles.infoValue}>{userData.role}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setIsEditing(true)}
                  >
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text>No user logged in</Text>
          </View>
        )}

        {!isEditing && (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleLogout}
          >
            <LogoutIcon />
            <Text className="text-[#E02323] font-semibold text-lg">Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
  },
  profileImageContainer: {
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 10,
    textAlign: 'center',
  },
  infoLabel: {
    fontWeight: 'bold',
    width: 100,
    fontSize: 16,
  },
  infoValue: {
    flex: 1,
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  saveButton: {
    backgroundColor: '#E02323',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 30,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    bottom: 30,
  },
});
