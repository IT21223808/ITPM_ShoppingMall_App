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
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

const adddetails = () => {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDob] = useState("");
  const [salary, setSalary] = useState("");
  const [isadmin, setIsadmin] = useState("");
  const [phoneNumber, setMobileNo] = useState("");
  const [address, setAddress] = useState("");

  const router = useRouter();
  const handleRegister = () => {
    const userData = {
      userName: userName,
      email:email,
      password:password,
      gender: gender,
      dateOfBirth:dateOfBirth,
      salary:salary,
      isadmin:isadmin,
      phoneNumber: phoneNumber,
      address: address,
    };

    axios
      .post("http://192.168.8.100:8000/addUser", userData)
      .then((response) => {
        Alert.alert(
          "Registration Successful",
          "You have been registered successfully"
        );
        setName("");
        setDob("");
        setMobileNo("");
        
        setAddress("");
        router.push('/(home)/user');
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
      <View style={{ padding: 15, marginTop:20 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a New User
        </Text>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Full Name (First and last Name)
          </Text>
          <TextInput
            value={userName}
            onChangeText={(text) => setName(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter your name"
            placeholderTextColor={"black"}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter your email"
            placeholderTextColor={"black"}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter your password"
            placeholderTextColor={"black"}
          />
        </View>

         <View>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Gender</Text>
          <TextInput
            value={gender}
            onChangeText={(text) => setGender(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Gender"
            placeholderTextColor={"black"}
          />
        </View> 

        {/* Gender Drop Down */}

        {/* <View>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Gender</Text>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View> */}

         <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Date of Birth</Text>
          <TextInput
            value={dateOfBirth}
            onChangeText={(text) => setDob(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="DOB"
            placeholderTextColor={"black"}
          />
        </View> 

       

        <View>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Mobile Number
          </Text>
          <TextInput
            value={phoneNumber}
            onChangeText={(text) => setMobileNo(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Mobile No"
            placeholderTextColor={"black"}
          />
        </View>
        

        <View>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Address</Text>
          <TextInput
            value={address}
            onChangeText={(text) => setAddress(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter Address"
            placeholderTextColor={"black"}
          />
        </View>
         <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>IsAdmin</Text>
          <TextInput
            value={isadmin}
            onChangeText={(text) => setIsadmin(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="IsAdmin"
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
            borderRadius: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            Add User
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default adddetails;

const styles = StyleSheet.create({});
