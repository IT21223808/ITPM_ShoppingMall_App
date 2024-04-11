import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather, Entypo, Ionicons, Fontisto, Octicons, AntDesign, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
const index = () => {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDob] = useState(new Date());
  const [isadmin, setIsadmin] = useState("false");
  const [phoneNumber, setMobileNo] = useState("");
  const [address, setAddress] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();
  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };
  const handleRegister = () => {
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid Email address");
      return;
    }
    const userData = {
      userName: userName,
      email: email,
      password: password,
      gender: gender,
      dateOfBirth: dateOfBirth,
      isadmin: isadmin,
      phoneNumber: phoneNumber,
      address: address,
    };

    axios
      .post("http://192.168.8.101:8000/addUser", userData)
      .then((response) => {
        Alert.alert(
          "Registration Successful",
          "You have been registered successfully"
        );
        setName("");
        setDob("");
        setMobileNo("");

        setAddress("");
        router.push("/login/");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Fail",
          "An error occurred during registration"
        );
        console.log("register failed", error);
      });
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 15, marginTop: 20 }}>
        <Text style={{ fontSize: 50, fontWeight: "bold", textAlign: "center", fontFamily: "serif" }}>SignUp</Text>
        <View style={{ marginVertical: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Full Name (First and last Name)
            </Text>
            <Ionicons name="person" size={22} color="black" style={{ left: 5, marginTop: 2 }} />

          </View>
          <TextInput
            value={userName}
            onChangeText={(text) => setName(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 20,
            }}
            placeholder="Enter your name"
            placeholderTextColor={"black"}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Email</Text>
            <Fontisto name="email" size={22} color="black" style={{ left: 5, marginTop: 2 }} />
          </View>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 20,
            }}
            placeholder="Enter your email"
            placeholderTextColor={"black"}
          />
        </View>

        <View style={{ marginVertical: 5 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Password</Text>
              <MaterialCommunityIcons name="form-textbox-password" size={22} color="black" style={{ left: 5, marginTop: 2 }} />
            </View>
            <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
              <Text style={{ fontSize: 15, marginTop: 5 }}>{passwordVisible ? 'Hide' : 'Show'}</Text>
            </Pressable>
          </View>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!passwordVisible}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 20,
            }}
            placeholder="Enter your password"
            placeholderTextColor={"black"}
          />

        </View>

        <View
          style={{
            marginVertical: 5,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Gender</Text>
              <MaterialCommunityIcons name="gender-male" size={22} color="black" style={{ left: 5, marginTop: 2 }} />

            </View>
            <View
              style={{
                borderColor: "#D0D0D0",
                borderWidth: 1,
                borderRadius: 5,
                borderRadius: 20,
                marginTop: 5,
                width: 150,
                height: 50
              }}
            >
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                mode="dropdown"
              >
                <Picker.Item label="Male" value="Male" color="black" />
                <Picker.Item label="Female" value="Female" color="black" />
                <Picker.Item label="Other" value="other" color="black" />
              </Picker>
            </View>
          </View>
          <View style={{ left: 70 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Date of Birth
              </Text>
              <Fontisto name="date" size={22} color="black" style={{ left: 5, marginTop: 2 }} />

            </View>
            <Pressable onPress={() => setShowDatePicker(true)}>
              <TextInput
                value={dateOfBirth ? dateOfBirth.toLocaleDateString() : ''}
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
                value={dateOfBirth}
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
        </View>

        <View style={{ marginVertical: 5 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Mobile Number
            </Text>
            <AntDesign name="phone" size={22} color="black" style={{ left: 5, marginTop: 2 }} />
          </View>
          <TextInput
            value={phoneNumber}
            onChangeText={(text) => setMobileNo(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 20,
            }}
            placeholder="Mobile No"
            placeholderTextColor={"black"}
            keyboardType="numeric" // Set keyboard type to numeric
            maxLength={10} // Limit maximum input length to 10
          />
        </View>

        <View style={{ marginVertical: 5 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Address</Text>
            <Entypo name="address" size={22} color="black" style={{ left: 5, marginTop: 2 }} />

          </View>
          <TextInput
            value={address}
            onChangeText={(text) => setAddress(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 20,
            }}
            placeholder="Enter Address"
            placeholderTextColor={"black"}
          />
        </View>

        <Pressable
          onPress={handleRegister}
          style={{
            backgroundColor: "#ABCABA",
            padding: 10,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>SignUp</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
