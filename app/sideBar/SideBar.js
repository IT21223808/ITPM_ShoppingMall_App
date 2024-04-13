import React from "react";
import { ScrollView, Pressable, Text, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Feather, Entypo, Ionicons, Octicons, AntDesign, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const SideBar = ({ isOpen, onClose, id, admin, name }) => {
    const router = useRouter();
    const handleCloseButtonClick = (event) => {
        // Prevent the event from propagating to the parent Pressable
        event.stopPropagation();
        // Call the onClose function to close the sidebar
        onClose();
    };

    return (
        <ScrollView style={isOpen ? styles.sidebarOpen : styles.sidebarClosed}>
            <Pressable onPress={handleCloseButtonClick} style={styles.closeButton}>
                <AntDesign name="close" size={24} color="black" />
            </Pressable>
            <View  style={{
               
                backgroundColor: "#b0acad",
                borderRadius: 7,
                paddingHorizontal :2,
                paddingVertical: 25,
              }} >
               
            <Text style={{ left: 15, marginTop: 2, fontSize: 36 ,fontFamily: 'sans-serif-condensed',color:'#bf0215'}}>WestField</Text>
           
            </View>
            <Pressable onPress={() =>
                admin ?
                    router.push({ pathname: "/(home)/user" })
                    : router.push({
                        pathname: "/(home)/feedbackform",
                        params: {
                            name: name,
                            id: id
                        },
                    })}
                style={{ borderBottomWidth: 1, borderBottomColor: "#ccc", paddingVertical: 15, marginTop: 50 }}>
                <View style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 5 }}>
                    {admin ? <Ionicons name="add" size={24} color="black" /> : <MaterialIcons name="feedback" size={24} color="black" style={{ left: 5, marginTop: 2 }} />}
                    <Text style={{ left: 10, marginTop: 4, fontSize: 16 }}> {admin ? 'Add New Product' : 'Feedback'}</Text>
                </View>
            </Pressable>

            <Pressable onPress={() =>
                admin ?
                    router.push({ pathname: "/(home)/user" })
                    : router.push({
                        pathname: "/(home)/userinfo",
                        params: {
                            name: name,
                            id: id
                        },
                    })
            } style={{ marginBottom: 20, marginTop: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 5 }}>
                    {admin ? <Ionicons name="ios-people-sharp" size={24} color="black" style={{ left: 5, marginTop: 2 }} /> : <MaterialCommunityIcons name="face-man-profile" size={24} color="black" style={{ left: 5, marginTop: 2 }} />}
                    <Text style={{ left: 10, marginTop: 4, fontSize: 16 }}> {admin ? 'User Profiles' : 'My Profile'}</Text>
                </View>
            </Pressable>
            {admin ? <Pressable onPress={() => router.push("/(home)/viewfeedback")} style={{ borderTopWidth: 1, borderTopColor: "#ccc", paddingVertical: 15 }}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", marginTop: 5 }}>
                    <MaterialIcons name="feedback" size={24} color="black" style={{ left: 5, marginTop: 2 }} />
                    <Text style={{ left: 15, marginTop: 4, fontSize: 16 }}>View Feedbacks</Text>
                </View>
            </Pressable> : ""}

            <Pressable onPress={() => router.push("/login/")} style={{ borderTopWidth: 1, borderTopColor: "#ccc", paddingVertical: 15 }}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", marginTop: 5 }}>
                    <AntDesign name="logout" size={22} color="black" style={{ left: 5, marginTop: 2 }} />
                    <Text style={{ left: 15, marginTop: 4, fontSize: 16 }}>LogOut</Text>
                </View>
            </Pressable>
            {/* Add more sidebar items as needed */}
        </ScrollView>
    );
};
export default SideBar;

const styles = StyleSheet.create({
    sidebarOpen: {
        width: 280,
        backgroundColor: "white",
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    sidebarClosed: {
        display: "none",
    },
    closeButton: {
        position: "flex",
        top:1,
        left:9,
        right: 0,
    },
    sidebarItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginTop: 5
    },
});
