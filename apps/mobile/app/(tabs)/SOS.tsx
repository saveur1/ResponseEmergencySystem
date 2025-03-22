import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createEmergencyRecord } from "../../actions/emergency";

const SOS = () => {
  return (
    <View>
      <Text>SOS</Text>
      <Button title="Create Test Emergency" onPress={createEmergencyRecord} />
    </View>
  );
};

export default SOS;
