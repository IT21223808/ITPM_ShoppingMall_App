import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import FeedBackResults from "../../components/FeedBackResults";

const viewfeedback = () => {
    const [feedbacks, setFeedback] = useState([]);
    const [input, setInput] = useState("");
    const router = useRouter();
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get("http://192.168.8.101:8000/feedbacks")
                setFeedback(response.data);
                console.log("User:", response.data);
            } catch (error) {
                console.log("error fetching user data", error);
            }
        };
        fetchFeedbacks();
    }, []);
    console.log(feedbacks);
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

                </Pressable>
            </View>

            {feedbacks.length > 0 ? (
                <FeedBackResults data={feedbacks} input={input} setInput={setInput} />
            ) : (
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Text>No Data</Text>
                    <Text>Sorry Currently You don't have any Feedbacks</Text>
                </View>
            )}
        </View>
    );
};

export default viewfeedback;

const styles = StyleSheet.create({});
