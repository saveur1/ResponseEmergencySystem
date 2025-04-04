import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FlashMessage, { showMessage } from "react-native-flash-message";
import CustomInput from "../components/customInput";
import Button from "../components/button";
import { router } from "expo-router";
import { AuthContext } from "../../Context/context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Auth context must be used within an AuthProvider");
  }
  const { login, error, checkAuthStatus } = authContext;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let valid = true;

    if (email.trim() === "") {
      setEmailError("Email is required");
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAuthStatus();
      if (isAuthenticated) {
        router.replace("/(tabs)");
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (error) {
      setLoading(false);
      showMessage({
        message: error,
        hideStatusBar: true,
        type: "danger",
        icon: "danger",
        duration: 6000,
      });
    }
  }, [error]);

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      const success = await login(email, password);

      if (success) {
        showMessage({
          message: "Login Successful",
          type: "success",
          icon: "success",
          duration: 3000,
        });
        router.replace("/(tabs)");
      } else {
        setLoading(false);
      }
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <View style={{ height: "100%" }}>
      <FlashMessage position="top" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <KeyboardAvoidingView>
            <Text
              style={{ fontSize: 30, fontWeight: "bold", color: "#E02323" }}
            >
              Let's sign you in.
            </Text>

            <Text style={{ paddingVertical: 4 }}>Welcome back.</Text>

            <View style={{ paddingVertical: 25 }}>
              <Text style={styles.label}>Email</Text>
              <CustomInput
                label={"Your email"}
                icon2={"email-outline"}
                onChangeText={setEmail}
                value={email}
                error={emailError}
              />
              {emailError ? (
                <Text
                  style={{
                    color: "red",
                    paddingVertical: 4,
                    height: 30,
                    fontSize: 12,
                  }}
                >
                  {emailError}
                </Text>
              ) : null}

              <Text style={styles.label}>Password</Text>
              <CustomInput
                label={"Enter password"}
                icon2={"lock-outline"}
                icon1={showPassword ? "eye-outline" : "eye-off-outline"}
                onChangeText={(e) => setPassword(e)}
                value={password}
                error={passwordError}
                onPress={togglePasswordVisibility}
                secureTextEntry={!showPassword}
              />
              {passwordError ? (
                <Text
                  style={{
                    color: "red",
                    paddingVertical: 2,
                    height: 30,
                    fontSize: 12,
                  }}
                >
                  {passwordError}
                </Text>
              ) : null}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#E02323",
                  marginTop: 8,
                  textAlign: "right",
                }}
              >
                Forgot password?
              </Text>
            </View>

            <Button title={"Login"} onPress={handleSubmit} loading={loading} />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                paddingVertical: 30,
              }}
            >
              <Text style={{ textAlign: "center" }}>Are you new here? </Text>
              <TouchableOpacity
                onPress={() => router.navigate("/Auth/register")}
              >
                <Text
                  style={{
                    color: "#E02323",
                    fontWeight: "500",
                    marginLeft: 2,
                  }}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 30,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    color: "#333",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#C4C0C0",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#C4C0C0",
  },
  text: {
    marginHorizontal: 10,
    color: "#A5A5A5",
    fontSize: 14,
    fontWeight: "500",
  },
});
