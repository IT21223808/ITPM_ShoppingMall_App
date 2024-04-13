import { StyleSheet, Text, View, ScrollView, Pressable, Dimensions } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons, Octicons ,AntDesign,MaterialIcons,MaterialCommunityIcons} from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import SideBar from "../sideBar/SideBar";
const index = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const _id = params?.id;
    const name = params?.name
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
    const screenHeight = Dimensions.get('window').height;
  return (
    <View style={{ flex: 1}}>
    {/* Render the Sidebar component */}
    <View style={{ position: "absolute", zIndex: 1,height: screenHeight }}>
    <SideBar isOpen={isSidebarOpen} onClose={toggleSidebar} id={_id} name={name} admin={false} />
    </View>
    <ScrollView style={{flex:1}}>
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
             <Pressable onPress={toggleSidebar} style={{right:100}}>
                <AntDesign name="bars" size={24} color="black" />
              </Pressable>
          
            <Text style={{ fontSize: 24, fontWeight: "600"}}>
              Welcome &nbsp;
            </Text>

            <Text style={{ fontSize: 28, fontWeight: "600",fontFamily:'serif'}}>
               {name}
            </Text>
        
          </View>

        
          <View
            // style={{
            //   marginTop: 100,
            //   backgroundColor: "white",
            //   paddingHorizontal: 10,
            //   paddingVertical: 10,
            //   borderRadius: 7,
            // }}
          >
            <Pressable
        //    onPress={() => 
        //     // router.push("/(home)/user")
        //     router.push({
        //         pathname: "/(home)/userinfo",
        //         params: {
        //           name: name,
        //           id: _id
        //         },
        //       })
        // }
              // style={{
              //   backgroundColor: "#e8aa74",
              //   borderRadius: 6,
              //   padding: 10,
              //   flexDirection: "row",
              //   alignItems: "center",
              //   marginVertical: 10,
              // }}
            >
              {/* <View
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
              </View> */}
              {/* <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                My Profile
              </Text> */}
              {/* <View
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
              </View> */}
            </Pressable>
            <Pressable
                onPress={() => router.push("/(home)/summary")}
              style={{
                // backgroundColor: "#e8aa74",
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
                  // backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
              {/* <Ionicons name="add" size={24} color="black" /> */}
                {/* <Octicons name="repo-pull" size={24} color="black" /> */}
              </View>
              {/* <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                Add New Product
              </Text> */}
              <View
                // style={{
                //   width: 35,
                //   height: 35,
                //   borderRadius: 7,
                //   backgroundColor: "white",
                //   alignItems: "center",
                //   justifyContent: "center",
                // }}
              >
                {/* <Entypo name="chevron-right" size={24} color="black" /> */}
              </View>
            </Pressable>
            <Pressable
                onPress={() => router.push("/(home)/summary")}
              style={{
                // backgroundColor: "#e8aa74",
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
                  // backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
              {/* <MaterialIcons name="category" size={24} color="black" /> */}
                {/* <Octicons name="repo-pull" size={24} color="black" /> */}
              </View>
              {/* <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                Add New Categories
              </Text> */}
              <View
                // style={{
                //   width: 35,
                //   height: 35,
                //   borderRadius: 7,
                //   backgroundColor: "white",
                //   alignItems: "center",
                //   justifyContent: "center",
                // }}
              >
                {/* <Entypo name="chevron-right" size={24} color="black" /> */}
              </View>
            </Pressable>
            <Pressable
                onPress={() => router.push("/(home)/summary")}
              style={{
                // backgroundColor: "#e8aa74",
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
                  // backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
              {/* <MaterialCommunityIcons name="offer" size={24} color="black" /> */}
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
                {/* Manage Promotion */}
              </Text>
              <View
                // style={{
                //   width: 35,
                //   height: 35,
                //   borderRadius: 7,
                //   backgroundColor: "white",
                //   alignItems: "center",
                //   justifyContent: "center",
                // }}
              >
                {/* <Entypo name="chevron-right" size={24} color="black" /> */}
              </View>
            </Pressable> 
          
          </View>
          <Pressable
                onPress={() => router.push("/login/")}
            //   style={{
            //     backgroundColor: "#e8aa74",
            //     borderRadius: 6,
            //     padding: 10,
            //     flexDirection: "row",
            //     alignItems: "center",
            //     marginVertical: 10,
            //   }}
            >
          <View
            style={{
              marginTop: 500,
              flexDirection: "row",
              alignItems: "center",
              gap: 13,
            }}
          >
            <View
              // style={{
              //   backgroundColor: "#636260",
              //   borderRadius: 10,
              //   padding: 12,
              //   alignItems: "center",
              //   justifyContent: "center",
              //   flex: 1,
              // }}
            >
              {/* <Text style={{ marginTop:2, marginBottom:2, color:"white",fontSize:18}}>Logout</Text> */}
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
