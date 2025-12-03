import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useState } from "react";
import axios from "axios";

export default function Post() {
  const [postContent, setPostContent] = useState("");

  async function handleSubmit() {
    try {
      const res = await axios.post(
        "http://192.168.43.35:8080/api/posts/me/posts",
        {
          content: postContent,
        },
        {
          auth: {
            username: "venkatsai1712",
            password: "12345678",
          },
          headers: {
            user_id: "1",
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Write Something..."
        value={postContent}
        onChangeText={setPostContent}
        multiline
      />

      <View style={{ width: "100%" }}>
        <Button title="Post" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    width: "100%",
    height: 150,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlignVertical: "top",
    fontSize: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
