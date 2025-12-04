import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  Button,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await axios.get(
          "http://192.168.43.35:8080/api/posts/feed/posts",
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
        setPosts(res.data);
        setLoaded(true);
      } catch (err) {
        console.log(err);
      }
    }

    getPosts();
  }, [refresh]);

  return (
    <>
      {loaded ? (
        <>
          <Button
            title="Refresh"
            onPress={() => {
              setRefresh(!refresh);
            }}
          />
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              console.log(item);
              return <Post data={item} />;
            }}
          />
        </>
      ) : (
        <ActivityIndicator
          animating={!loaded}
          size={"large"}
          style={{ flexDirection: "column", flex: 1 }}
        />
      )}
    </>
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
