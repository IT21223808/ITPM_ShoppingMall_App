import { StyleSheet, Text, View, FlatList, Pressable, Alert } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
const SearchResults = ({ data, input, setInput }) => {
  const router = useRouter();

  const handleUserPress = (itemId) => {
    router.push({
      pathname: "/useredit",
      params: {
        id: itemId,
      },
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handleDelete = (itemId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this user?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            try {
              axios.delete(`http://192.168.8.100:8000/deleteuser/${itemId}`)
              console.log("User Deleted Successfully");
              Alert.alert("User deleted","User has been deleted sucessfully");
              router.push('/(home)/user');
            } catch (error) {
              console.log("error while deleting user data", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item?.userName.toLowerCase().includes(input.toLowerCase())) {
            return (
              <View style={{ marginVertical: 10, gap: 10, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row" }}>
                  <Pressable onPress={() => handleUserPress(item._id)}>
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
                      <Text style={{ color: "white", fontSize: 16 }}>{item?.userName?.charAt(0)}</Text>
                    </View>
                  </Pressable>
                  <View style={{ marginLeft: 10 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {item?.userName}
                    </Text>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      <MaterialIcons name="email" size={20} color="black" /> {item?.email}
                    </Text>
                    <Text style={{ fontSize: 20, marginTop: 5, color: "black" }}>
                      <MaterialIcons name="people" size={20} color="black" /> Gender -{" "}
                      {item?.gender}
                    </Text>
                    <Text style={{ fontSize: 20, marginTop: 5, color: "black" }}>
                      <MaterialIcons name="admin-panel-settings" size={22} color="black" /> IsAdmin -{" "}
                      {item?.isadmin}
                    </Text>
                    <Text style={{ fontSize: 20, marginTop: 6, color: "black" }}>
                      <MaterialIcons name="date-range" size={20} color="black" /> DOB -{" "}
                      {formatDate(item?.dateOfBirth)}
                    </Text>
                    <Text style={{ fontSize: 20, marginTop: 6, color: "black" }}>
                      <MaterialIcons name="location-on" size={20} color="black" /> Address
                      - {item?.address}
                    </Text>
                    <Text style={{ fontSize: 20, marginTop: 6, color: "black" }}>
                      <MaterialIcons name="phone" size={20} color="black" /> Phone -{" "}
                      {item?.phoneNumber}
                    </Text>
                  </View>
                </View>
                <Pressable onPress={() => handleDelete(item._id)}>
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
                    <MaterialIcons name="delete" size={20} color="black" />
                  </View>
                </Pressable>
              </View>

            );
          }
        }}
      // contentContainerStyle={{ paddingBottom: 100 }} 
      />
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({});
