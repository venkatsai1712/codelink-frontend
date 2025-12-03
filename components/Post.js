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

export default function Post({ data }) {
  const item = data;
  return (
    <View style={styles.card}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: item.profilePicture || null }}
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
          <Ionicons name="thumbs-up-outline" size={24} /> {item.likes.length}
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
