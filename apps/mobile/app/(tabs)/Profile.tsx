import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { router } from "expo-router";
import { AuthContext } from "../../Context/context";
import Button from "../components/button";
import FlashMessage, { showMessage } from "react-native-flash-message";

const Profile = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Auth context must be used within an AuthProvider");
  }

  const { logout } = authContext;

  const handleLogout = async () => {
    try {
      await logout();
      showMessage({
        message: "Logged Out Successfully",
        type: "success",
        icon: "success",
        duration: 2000,
      });
      router.navigate("/Auth/login");
    } catch (error) {
      showMessage({
        message: "Logout Failed",
        type: "danger",
        icon: "danger",
        duration: 2000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      <Text style={styles.title}>Profile</Text>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 30,
  },
  logoutButton: {
    backgroundColor: "#E02323",
  },
});
