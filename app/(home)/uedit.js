import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Pressable, ScrollView } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather, Entypo, Ionicons, Fontisto, Octicons, AntDesign, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
const uedit = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const _id = params?.id;
  console.log("Id", _id);
  const [userData, setUserData] = useState({}); // State to store user data
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [dob, setDob] = useState(new Date());

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  // Fetch user data based on ID on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("IDs", _id);
        const response = await axios.get(`http://192.168.8.101:8000/users/${_id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);
  console.log("Userdata", userData);

  // Handle form submission (assuming an edit user API endpoint exists)
  const handleEditUser = async () => {
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid Email address");
      return;
    }
    try {
      const response = await axios.patch(
        `http://192.168.8.101:8000/userupdate/${_id}`,
        userData
      );
      if (response.status === 200) {
        alert("User details edited successfully!"); // Placeholder for success message
        router.push("/(home)/home");
      } else {
        console.error("Error updating user:", response.data);
        alert("Failed to update user details!"); // Informative error message
      }
    } catch (error) {
      console.error("Error patching user data:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading user data...</Text>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Edit Your Details</Text>

          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 18, fontFamily: "serif" }}>Username</Text>
            <Ionicons name="person" size={20} color="black" style={{ left: 5, marginTop: 2 }} />
          </View>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 20,
            }}
            value={userData.userName || ""} // Pre-fill with existing data
            onChangeText={(text) =>
              setUserData({ ...userData, userName: text })
            }
            placeholder="Username"
          />
          <View style={{ marginVertical: 5 }}>

            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
              <Text style={{ fontSize: 18, fontFamily: "serif" }}>Email</Text>
              <Fontisto name="email" size={20} color="black" style={{ left: 5, marginTop: 2 }} />
            </View>

            <TextInput
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 5,
                borderRadius: 20,
              }}
              value={userData.email || ""} // Pre-fill with existing data
              onChangeText={(text) =>
                setUserData({ ...userData, email: text })
              }
              placeholder="Email"
            />
          </View>

          <View style={{ marginVertical: 5 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 18, fontFamily: "serif" }}>Password</Text>
                <MaterialCommunityIcons name="form-textbox-password" size={20} color="black" style={{ left: 5, marginTop: 2 }} />
              </View>
              <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
                <Text style={{ fontSize: 15, marginTop: 5 }}>{passwordVisible ? 'Hide' : 'Show'}</Text>
              </Pressable>
            </View>
            <TextInput
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 5,
                borderRadius: 20,
              }}
              value={userData.password || ""} // Pre-fill with existing data
              secureTextEntry={!passwordVisible}
              onChangeText={(text) =>
                setUserData({ ...userData, password: text })
              }
              placeholder="Password"
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18, fontFamily: "serif" }}>Gender</Text>
              <MaterialCommunityIcons name="gender-male" size={20} color="black" style={{ left: 5, marginTop: 2 }} />

            </View>

            <View style={{
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderRadius: 5,
              borderRadius: 20,
              marginTop: 5,
              // width: 150,
              // height: 50
            }}>

              <Picker
                selectedValue={userData.gender || ""}
                onValueChange={(itemValue, itemIndex) => setUserData({ ...userData, gender: itemValue })}
                mode="dropdown"
              >
                <Picker.Item label="Male" value="Male" color="black" />
                <Picker.Item label="Female" value="Female" color="black" />
                <Picker.Item label="Other" value="other" color="black" />
              </Picker>
            </View>
          </View>

          <View style={{ marginVertical: 5 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18, fontFamily: "serif" }}>
                DOB
              </Text>
              <Fontisto name="date" size={20} color="black" style={{ left: 5, marginTop: 2 }} />

            </View>
            <Pressable onPress={() => setShowDatePicker(true)}>
              <TextInput
                value={dob ? dob.toLocaleDateString() : new Date().toLocaleDateString()}
                style={{
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 5,
                  borderRadius: 20,
                }}
                placeholder="DOB"
                placeholderTextColor={"black"}
                editable={false} // Make the input non-editable
              />
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={dob || new Date()}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false); // Close the date picker
                  if (selectedDate) {
                    setDob(selectedDate); // Update the date of birth if a date is selected
                  }
                }}
              />
            )}
          </View>
          <View style={{ marginVertical: 5 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18, fontFamily: "serif" }}>
                Phone Number
              </Text>
              <AntDesign name="phone" size={20} color="black" style={{ left: 5, marginTop: 2 }} />
            </View>
            <TextInput
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 20,
              }}
              value={userData.phoneNumber || ""} // Pre-fill with existing data
              onChangeText={(text) =>
                setUserData({ ...userData, phoneNumber: text })
              }
              placeholder="Phone Number"
              keyboardType="numeric" // Set keyboard type to numeric
              maxLength={10} // Limit maximum input length to 10
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18, fontFamily: "serif" }}>Address</Text>
              <Entypo name="address" size={20} color="black" style={{ left: 5, marginTop: 2 }} />

            </View>

            <TextInput
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 20,
              }}
              value={userData.address || ""} // Pre-fill with existing data
              onChangeText={(text) => setUserData({ ...userData, address: text })}
              placeholder="Address"
            />
          </View>
          <Pressable
            onPress={handleEditUser}
            style={{
              marginTop: 5,
              flexDirection: "row",
              alignItems: "center",
              // width: 150,
              height: 40
            }}
          >
            <View

              style={{
                backgroundColor: "#53bcfc",
                borderRadius: 40,
                padding: 5,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }} >SAVE CHANGES</Text>
            </View>

          </Pressable>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 5,
  },
});

export default uedit;
