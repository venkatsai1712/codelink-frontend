import { useState } from "react";
import {
  TextInput,
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from "react-native";
import axios from "axios";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("illavenkatsai1712@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [firstName, setFirstName] = useState("venkat");
  const [lastName, setLastName] = useState("illa");
  const [username, setUsername] = useState("illavenkat");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://192.168.43.35:8080/api/auth/register",
        {
          firstName,
          lastName,
          username,
          email,
          password,
        }
      );
      navigation.replace("Tabs");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />

        <View style={{ width: "100%", marginTop: 10 }}>
          <Button title="Register" onPress={handleSubmit} />
        </View>
        <Modal animationType="none" transparent={true} visible={loading}>
          <View style={styles.modal}>
            <ActivityIndicator size={"large"} animating={loading} />
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
  },

  card: {
    width: "85%",
    padding: 25,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    elevation: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 25,
  },

  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },

  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
