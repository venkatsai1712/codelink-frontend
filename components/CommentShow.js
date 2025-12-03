import { ScrollView, View, Text, StyleSheet } from "react-native";

export default function CommentShow({ data }) {
  return (
    <ScrollView style={styles.comments}>
      {data.map((comm, index) => (
        <View key={index}>
          <Text>{comm.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  comments: {
    marginTop: "20",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
  },
});
