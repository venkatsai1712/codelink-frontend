import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Network from "./screens/Network";
import Post from "./screens/Post";
import Profile from "./screens/Profile";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <Ionicons name="home" size={24} color={"black"} />,
        }}
      />
      <Tab.Screen
        name="Network"
        component={Network}
        options={{
          tabBarIcon: () => (
            <Ionicons name="people" size={24} color={"black"} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarIcon: () => (
            <Ionicons name="add-circle" size={24} color={"black"} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Ionicons name="person" size={24} color={"black"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
