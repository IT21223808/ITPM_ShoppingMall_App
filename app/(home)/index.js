import { StyleSheet, Text, View, ScrollView, Pressable, Dimensions } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons, Octicons, AntDesign, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SideBar from "../sideBar/SideBar";

const index = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const screenHeight = Dimensions.get('window').height;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: "absolute", zIndex: 1, height: screenHeight }}>
        <SideBar isOpen={isSidebarOpen} onClose={toggleSidebar} admin={true} />
      </View>
      <ScrollView style={{ flex: 1 }}>
        <LinearGradient colors={["#d1d3d5", "#d1d3d5"]} style={{ flex: 1 }}>
          <View style={{ padding: 19 }}>
            <View
              style={{
                marginTop: 30,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pressable onPress={toggleSidebar} style={{ right: 80 }}>
                <AntDesign name="bars" size={24} color="black" />
              </Pressable>
              {/* <AntDesign name="bars" size={24} color="black" style={{right:100}}/> */}
              {/* <Feather name="bar-chart" size={24} color="black"style={{right:50}} /> */}
              <Text style={{ fontSize: 24, fontWeight: "600" }}>
                Admin Dashboard
              </Text>
              {/* <Entypo name="lock" size={24} color="black" /> */}
            </View>

            <View
              style={{
                marginTop: 100,
                backgroundColor: "white",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 7,
              }}
            >
              <Pressable
                onPress={() => router.push("/(home)/user")}
                style={{
                  backgroundColor: "#e8aa74",
                  borderRadius: 6,
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    padding: 7,
                    width: 45,
                    height: 45,
                    borderRadius: 7,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="ios-people-sharp" size={24} color="black" />
                </View>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 16,
                    fontWeight: "600",
                    flex: 1,
                  }}
                >
                  User List
                </Text>
                <View
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 7,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Entypo name="chevron-right" size={24} color="black" />
                </View>
              </Pressable>
              <Pressable
                onPress={() => router.push("/(home)/addproduct")}
                style={{
                  backgroundColor: "#e8aa74",
                  borderRadius: 6,
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    padding: 7,
                    width: 45,
                    height: 45,
                    borderRadius: 7,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="add" size={24} color="black" />
                  {/* <Octicons name="repo-pull" size={24} color="black" /> */}
                </View>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 16,
                    fontWeight: "600",
                    flex: 1,
                  }}
                >
                  Add New Product
                </Text>
                <View
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 7,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Entypo name="chevron-right" size={24} color="black" />
                </View>
              </Pressable>
              <Pressable
                onPress={() => router.push("/(home)/addnewcategory")}
                style={{
                  backgroundColor: "#e8aa74",
                  borderRadius: 6,
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    padding: 7,
                    width: 45,
                    height: 45,
                    borderRadius: 7,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialIcons name="category" size={24} color="black" />
                  {/* <Octicons name="repo-pull" size={24} color="black" /> */}
                </View>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 16,
                    fontWeight: "600",
                    flex: 1,
                  }}
                >
                  Add New Store
                </Text>
                <View
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 7,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Entypo name="chevron-right" size={24} color="black" />
                </View>
              </Pressable>
              <Pressable
                onPress={() => router.push("/(home)/addoffer")}
                style={{
                  backgroundColor: "#e8aa74",
                  borderRadius: 6,
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    padding: 7,
                    width: 45,
                    height: 45,
                    borderRadius: 7,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons name="offer" size={24} color="black" />
                  {/* <Octicons name="repo-pull" size={24} color="black" /> */}
                </View>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 16,
                    fontWeight: "600",
                    flex: 1,
                  }}
                >
                  Add Offer
                </Text>
                <View
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 7,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Entypo name="chevron-right" size={24} color="black" />
                </View>
              </Pressable>

            </View>

            <Pressable onPress={() => router.push("/login/")} style={{
              marginTop: 145,
              flexDirection: "row",
              alignItems: "center",
              gap: 13,
            }}>
              <View
                style={{
                  marginTop: 145,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 13,
                }}
              >

                <View
                  style={{
                    backgroundColor: "#636260",
                    borderRadius: 6,
                    padding: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <Text style={{ marginTop: 5, marginBottom: 5, color: "white" }}>Logout</Text>
                </View>

              </View>
            </Pressable>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
