import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import UserInfo from "../../components/UserResults";
import { useLocalSearchParams } from "expo-router";
const userinfo = () => {
  const params = useLocalSearchParams();
  const _id = params?.id;
  const [user, setUser] = useState({});
  const [input, setInput] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("IDs", _id);
        const response = await axios.get(`http://192.168.8.100:8000/users/${_id}`);
        console.log("User details",response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);
  console.log("User",user);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Ionicons
          onPress={() => router.back()}
          style={{ marginLeft: 10 }}
          name="arrow-back"
          size={24}
          color="black"
        />
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 40,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ marginLeft: 10 }}
            name="search1"
            size={20}
            color="black"
          />
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            style={{ flex: 1 }}
            placeholder="Search"
          />

          {
          user.length > 0 && (
            <View>
              <Pressable onPress={() => router.push("/(home)/adddetails")}>
                <AntDesign name="pluscircle" size={30} color="#0072b1" />
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>

      {Object.keys(user).length > 0 ? (
  <UserInfo data={user} input={input} setInput={setInput} />
) : (
  <View
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  >
    <Text>No Data</Text>
    <Text>Please contact your Administrator</Text>
    <Pressable onPress={() => router.push("/(home)/adddetails")}>
      <AntDesign
        style={{ marginTop: 30 }}
        name="pluscircle"
        size={24}
        color="black"
      />
    </Pressable>
  </View>
)}

    </View>
  );
};

export default userinfo;

const styles = StyleSheet.create({});
