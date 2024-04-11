import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";

import { MaterialIcons } from "@expo/vector-icons";
const UserResults = ({ data, input, setInput }) => {
  const router = useRouter();
  console.log("Request to User Info", data);
  const handleUserPress = (itemId) => {
    router.push({
      pathname: "/uedit",
      params: {
        id: itemId,
      },
    });
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View style={{ padding: 5 }}>
      <View
        style={{
          marginVertical: 10,
          gap: 20,
          flexDirection: "col",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => handleUserPress(data._id)}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              padding: 10,
              backgroundColor: "#4b6cb7",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 20,fontFamily:"serif" }}>
              {data?.userName?.charAt(0)}
            </Text>
          </View>
        </Pressable>

        <View
          style={{
            marginTop: 10,
            width: 380,
            height: 380,
            borderRadius: 8,
            padding: 10,
            backgroundColor: "#b6d7fc",
            alignItems: "left",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 65,
              marginLeft:90,
              fontWeight: "bold",
              textTransform: "uppercase",
              fontFamily:"serif"
            }}
          >
            {data?.userName}
          </Text>
          <Text style={{ fontSize: 25,marginTop:10, color: "black" }}>
            <MaterialIcons name="email" size={20} color="black" /> {data?.email}
          </Text>
          <Text style={{ fontSize: 20, marginTop: 10, color: "black" }}>
            <MaterialIcons name="people" size={20} color="black" /> Gender -{" "}
            {data?.gender}
          </Text>
          <Text style={{ fontSize: 20, marginTop: 10, color: "black" }}>
            <MaterialIcons name="date-range" size={20} color="black" /> DOB -{" "}
            {formatDate(data?.dateOfBirth)}
          </Text>
          <Text style={{ fontSize: 20, marginTop: 10, color: "black" }}>
            <MaterialIcons name="location-on" size={20} color="black" /> Address
            - {data?.address}
          </Text>
          <Text style={{ fontSize: 20, marginTop: 10, color: "black" }}>
            <MaterialIcons name="phone" size={20} color="black" /> Phone -{" "}
            {data?.phoneNumber}
          </Text>
        </View>

        {/* <Pressable onPress={() => handleDelete(data._id)}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 8,
                      padding: 10,
                      backgroundColor: "red",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 16 }}>Delete</Text>
                  </View>
                </Pressable> */}
      </View>
    </View>
  );
};

export default UserResults;

const styles = StyleSheet.create({});
