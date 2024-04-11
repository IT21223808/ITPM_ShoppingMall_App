import { StyleSheet, Text, View, ScrollView, Pressable, Alert,Image } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons, Octicons ,AntDesign,MaterialIcons,MaterialCommunityIcons} from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
const index = () => {
  const [email, setEmail] = useState("");
  const[password,setPassword] = useState("");
    const router = useRouter();

    const Login = async () => {
      const userdata={
        email:email,
        password:password
      }
      console.log("Data",userdata.email);
      const validateEmail = (email) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
      };
      if((userdata.email==null || userdata.password==null)){
        Alert.alert("Email and Password Required","Please fill all the informations");
      }
      if(!validateEmail(email)){
        Alert.alert("Enter correct Email format");
      }
      else{
        await axios
        // 192.168.8.101:
         .post("http://192.168.8.101:8000/login",userdata)
         .then((response) => {
           if(!(response.data == null)){
           Alert.alert(
             "Login Successful",
             "You have been Login successfully"
           );
           console.log("Response",response.data.isadmin);
         if(response.data.isadmin=='true'){
          router.push("/(home)/");
          console.log("Admin");
         }
         else{
          // router.push("/(home)/home");
          router.push({
            pathname: "/(home)/home",
            params: {
              name: response.data.userName,
              id: response.data._id
            },
          });
          console.log("Not Admin");
         }
         }
           else{
             Alert.alert(
               "Login UnSuccessfull",
               "Please check the credentials"
             );
           }
         })

         .catch((error) => {
           Alert.alert(
             "Login Fail",
             "An error occurred during login"
           );
           console.log("login failed", error);
         });
      }
    
    };
  return (
    <ScrollView>
      <LinearGradient colors={["#723bc4", "#ccb5e8"]} style={{ flex: 1 }}>
        <View style={{ padding: 19 }}>
          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
         
            <Text style={{ fontSize: 70, fontWeight: "600",fontFamily:"serif" }}>
              Login
            </Text>
      
          </View>
          {/* <Image
              source={{ uri: 'https://i.pinimg.com/736x/a9/dd/93/a9dd9332469ecad9d9770985d8e032f0.jpg' }} 
              style={{ width: 340, height: 200, borderRadius:20, resizeMode:"cover", marginTop:15 }} 
            /> */}
          
          <Image
              source={require('../../assets/login.jpg')}
              style={{ width: 390, height: 200, borderRadius:20, resizeMode:"cover", marginTop:15,right:18}} 
            />

        
          <View
            style={{
              marginTop: 50,
              backgroundColor: "transparent",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 7,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "white",
                borderRadius: 30,
                padding: 6,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 35,
                  height: 35,
                  borderRadius: 20,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="ios-people-sharp" size={20} color="black" />
              </View>
             
              <TextInput value={email}
            onChangeText={(text) => setEmail(text)}
            style={{
              padding: 10,
              marginLeft:10,
              width:250,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              // marginTop: 10,
              borderRadius: 20,
            }}
            placeholder="Enter your email"
            placeholderTextColor={"black"} />
            
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "white",
                borderRadius: 30,
                padding: 6,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 35,
                  height: 35,
                  borderRadius: 20,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons name="form-textbox-password" size={20} color="black" />
              </View>
             
              <TextInput value={password}
            onChangeText={(text) => setPassword(text)}
            style={{
              padding: 10,
              marginLeft:10,
              width:250,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              // marginTop: 10,
              borderRadius: 20,
            }}
            placeholder="Enter your password"
            placeholderTextColor={"black"} />
            </Pressable>
           
            <Pressable
            onPress={()=>router.push("/signUp/")}
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                padding: 6,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 35,
                  height: 35,
                  borderRadius: 20,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
              <MaterialCommunityIcons name="offer" size={20} color="black" />
                {/* <Octicons name="repo-pull" size={24} color="black" /> */}
              </View>
              <Text
                style={{
                  alignItems:"center",
                  textAlign:"center",
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                Sign Up
              </Text>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  // backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <Entypo name="chevron-right" size={24} color="black" /> */}
              </View>
            </Pressable> 
          
          </View>
         
          <Pressable
           onPress={Login}
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 13,
            }}
          >
            <View
           
              style={{
                backgroundColor: "#636260",
                borderRadius: 40,
                padding: 12,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Text style={{ marginTop:5, marginBottom:5, color:"white",fontSize:20}} 
              // onPress={()=>router.push("/(home)/")}
              
              >Login</Text>
            </View>
          
          </Pressable>
        </View>
      </LinearGradient>
    </ScrollView>
  );


};



export default index;

const styles = StyleSheet.create({});
