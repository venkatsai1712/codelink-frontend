import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import CommentShow from "../components/CommentShow";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useState } from "react";

export default function Post({ data }) {
  const [postLiked, setPostLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const item = data;

  useState(() => {
    setLikesCount(item.likes.length);
  }, []);

  async function handleLike(post_id) {
    if (!postLiked) {
      try {
        console.log("Liked");
        const res = await axios.post(
          `http://192.168.43.35:8080/api/posts/me/posts/${post_id}/likes`,
          {},
          {
            auth: {
              username: "venkatsai1712",
              password: "12345678",
            },
            headers: {
              user_id: 1,
            },
          }
        );
        setPostLiked(true);
        getLikesCount(post_id);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Disliked");
      try {
        const res = await axios.post(
          `http://192.168.43.35:8080/api/posts/me/posts/${post_id}/dislikes`,
          {},
          {
            auth: {
              username: "venkatsai1712",
              password: "12345678",
            },
            headers: {
              user_id: 1,
            },
          }
        );
        setPostLiked(false);
        getLikesCount(post_id);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function getLikesCount(post_id) {
    try {
      const res = await axios.get(
        `http://192.168.43.35:8080/api/posts/me/posts/${post_id}/likes`,
        {
          auth: {
            username: "venkatsai1712",
            password: "12345678",
          },
          headers: {
            user_id: 1,
          },
        }
      );
      setLikesCount(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: item.profilePicture }}
          style={styles.profileIcon}
          alt="Pic"
          width={50}
          height={50}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.name}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.username}>@{item.username}</Text>
        </View>
      </View>
      <View style={styles.line}></View>

      <Text style={styles.content}>{item.content}</Text>
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRpPZVO-st75kUGz4__8JPhTS1hqz8WTUvgg&s",
        }}
        width="100%"
        height={200}
        resizeMode="contain"
        style={styles.postPhoto}
      />
      <View style={styles.line}></View>
      <View style={styles.postActivity}>
        <Text style={styles.meta}>
          <Ionicons
            name={postLiked ? "thumbs-up" : "thumbs-up-outline"}
            size={24}
            onPress={() => {
              handleLike(item.id);
            }}
          />{" "}
          {likesCount}
        </Text>
        <Text style={styles.meta}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} />{" "}
          {item.comments.length}
        </Text>
      </View>
      {item.comments.length > 0 ? <CommentShow data={item.comments} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  postPhoto: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "grey",
  },
  profileIcon: {
    borderWidth: 0.5,
    borderColor: "black",
    marginEnd: 10,
    borderRadius: 50,
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#ddd",

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    alignSelf: "flex-start",
  },

  name: {
    fontSize: 17,
    fontWeight: "600",
  },

  username: {
    fontSize: 14,
    color: "gray",
  },

  content: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "500",
    lineHeight: 22,
    marginTop: 10,
  },

  postActivity: {
    flexDirection: "row",
    marginTop: 10,
    gap: 15,
    alignSelf: "flex-start",
  },

  meta: {
    fontSize: 14,
    color: "gray",
  },
});
