import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";

const Profile = () => {
  const navigate = useNavigation();
  return (
    <View>
      <Text>Profile</Text>
      <Pressable
        onPress={() => {
          navigate.navigate("/Community");
        }}
      ></Pressable>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
