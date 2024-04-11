import { StyleSheet, Text, View, FlatList, Pressable, Alert } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
const FeedbackResults = ({ data, input, setInput }) => {
    const router = useRouter();
    const handleUserPress = (itemId) => {
        // router.push({
        //     pathname: "/useredit",
        //     params: {
        //         id: itemId,
        //     },
        // });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const handleDelete = (itemId) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this Feedback?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {
                        try {
                            axios.delete(`http://192.168.8.101:8000/deletefeedback/${itemId}`)
                            console.log("Feedback Deleted Successfully");
                            Alert.alert("Feedback deleted","Feedback of the user has been deleted sucessfully");
                            router.push('/(home)/viewfeedback');
                        } catch (error) {
                            console.log("error while deleting feedback data", error);
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
                                                width: 40,
                                                height: 40,
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
                                        <View style={{ flexDirection: "row" }}>
                                            <MaterialIcons name="email" size={20} color="black" />
                                            <Text style={{ fontSize: 15, color: "black" }}> {item?.user.email}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                                            <MaterialIcons name="admin-panel-settings" size={22} color="black" />
                                            <Text style={{ fontSize: 15, color: "black" }}>Feedback -{" "}{item?.feedback}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                                            <MaterialIcons name="date-range" size={20} color="black" />
                                            <Text style={{ fontSize: 15, color: "black" }}>Submitted -{" "}{formatDate(item?.createdAt)}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                                            <MaterialCommunityIcons name="shield-star-outline" size={20} color="black" />
                                            <Text style={{ fontSize: 15, color: "black" }}> Rating </Text>
                                            <View style={styles.starsContainer}>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Pressable key={star}>
                                                        <AntDesign
                                                            name={star <= item?.rating ? "star" : "staro"}
                                                            size={20}
                                                            color="#FFD700"
                                                            style={styles.starIcon}
                                                        />
                                                    </Pressable>
                                                ))}
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                                            <MaterialIcons name="phone" size={20} color="black" />
                                            <Text style={{ fontSize: 15, color: "black" }}>Phone -{" "}{item?.user.phoneNumber}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Pressable onPress={() => handleDelete(item._id)}>
                                    <View
                                        style={{
                                            width: 40,
                                            height: 40,
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

export default FeedbackResults;

const styles = StyleSheet.create({
    starsContainer: {
        flexDirection: "row",
    },
    starIcon: {
        marginRight: 5,
    },
});
