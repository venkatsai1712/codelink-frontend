import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";

export default function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function getProfileDetails() {
      try {
        const res = await axios.get("http://192.168.43.35:8080/api/users/me", {
          auth: {
            username: "venkatsai1712",
            password: "12345678",
          },
          headers: { user_id: 1 },
        });

        setUserDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getProfileDetails();
  }, []);

  async function getProjects() {
    try {
      const res = await axios.get("http://192.168.43.35:8080/api/projects/me", {
        auth: {
          username: "venkatsai1712",
          password: "12345678",
        },
        headers: { user_id: 1 },
      });
      setProjects(res.data || []);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.name}>
          {userDetails.firstName} {userDetails.lastName}
        </Text>
        <Text style={styles.username}>@{userDetails.username}</Text>
        <Text style={styles.email}>{userDetails.email}</Text>
      </View>

      <Button title="Get My Projects" onPress={getProjects} />

      {projects.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>Projects</Text>
          <FlatList
            data={projects}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.projectCard}>
                <Text style={styles.projectTitle}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.duration}>Duration: {item.duration}</Text>
                <Text style={styles.status}>Status: {item.status}</Text>

                <Text style={styles.stackTitle}>Tech Stack:</Text>
                <View style={styles.stackList}>
                  {item.techStack.map((tech, index) => (
                    <Text key={index} style={styles.techItem}>
                      • {tech}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          />
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f2f2f2",
  },

  profileCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 5,
  },

  username: {
    fontSize: 16,
    color: "gray",
    marginBottom: 5,
  },

  email: {
    fontSize: 16,
    color: "#333",
  },

  sectionTitle: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },

  projectCard: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },

  projectTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
  },

  description: {
    fontSize: 15,
    color: "#444",
    marginBottom: 5,
  },

  duration: {
    fontSize: 14,
    marginBottom: 2,
  },

  status: {
    fontSize: 14,
    marginBottom: 10,
  },

  stackTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  stackList: {
    marginTop: 5,
  },

  techItem: {
    fontSize: 14,
    color: "#555",
  },
});
