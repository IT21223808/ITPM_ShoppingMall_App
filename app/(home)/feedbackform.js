import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import axios from "axios";

const feedbackform = () => {

    const params = useLocalSearchParams();
    const router = useRouter();

    const _id = params?.id;
    const name = params?.name;
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(0); // Initial rating is 0

    const handleFeedbackChange = (text) => {
        setFeedback(text);
    };

    const handleStarPress = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleSubmitFeedback = () => {
        if (feedback == '') {
            Alert.alert("Cannot submit empty feedback", "Please fill your feedback");
            return;
        }
        const data = {
            user: _id,
            id: _id,
            userName: name,
            feedback: feedback,
            rating: rating
        }
        axios.post("http://192.168.8.100:8000/addFeedback", data).then((response) => {
            Alert.alert(
                "Feedback Submitted",
                "Thank You for your valuable feedback"
            );
            // Reset the form after submission
            setFeedback("");
            setRating(0);
            router.push({
                pathname: "/(home)/home",
                params: {
                    name: name,
                    id: _id
                },
            })
        })
            .catch((error) => {
                Alert.alert(
                    "Registration Fail",
                    "An error occurred during registration"
                );
                console.log("register failed", error);
            })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Feedback Form</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your feedback"
                multiline
                value={feedback}
                onChangeText={handleFeedbackChange}
            />
            <Text style={styles.title_rate}>Rate our app:</Text>
            <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Pressable key={star} onPress={() => handleStarPress(star)}>
                        <AntDesign
                            name={star <= rating ? "star" : "staro"}
                            size={30}
                            color="#FFD700"
                            style={styles.starIcon}
                        />
                    </Pressable>
                ))}
            </View>
            <Pressable onPress={handleSubmitFeedback} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit Feedback</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        fontFamily: "serif",
        textAlign: "center",
        alignContent: "center",
        justifyContent: "center",

    },
    title_rate: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        fontFamily: "serif",
        alignContent: "center",
        justifyContent: "center",

    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        minHeight: 100,
    },
    starsContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    starIcon: {
        marginRight: 5,
    },
    submitButton: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    submitButtonText: {
        color: "white",
        fontSize: 18,
    },
});

export default feedbackform;
