import { Text, View, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Network() {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    async function getFollowers() {
      try {
        const res = await axios.get(
          "http://192.168.43.35:8080/api/users/352/followers"
        );
        console.log(res.data);
        setFollowers(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getFollowers();
  }, followers);

  return (
    <FlatList
      data={followers}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Text>{item.first_name}</Text>}
    />
  );
}
