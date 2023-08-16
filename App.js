import { Ionicons } from "@expo/vector-icons";
import { UserProvider } from "./src/contexts/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomePage from "./src/Index";
import LoginPage from "./src/Login";
import RegisterPage from "./src/Register";

import DashboardPage from "./src/User/Dashboard";
import ProfilePage from "./src/User/Profile";
import CardPage from "./src/User/Card";
import InfoPage from "./src/User/Info";
import IntroductionPages from "./src/User/Introduction";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#151515" },
        headerShadowVisible: false,
        headerTintColor: "#0A9B97",
        headerTitleAlign: "center",
        tabBarStyle: {
          height: 104,
          backgroundColor: "#151515",
          paddingBottom: 36,
          paddingTop: 12,
          borderTopWidth: 0,
        },
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarInactiveBackgroundColor: "#151515",
        tabBarActiveTintColor: "#0A9B97",
        tabBarActiveBackgroundColor: "#151515",
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardPage}
        options={{
          headerStyle: { backgroundColor: "#151515" },
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Card"
        component={CardPage}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "wallet" : "wallet-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={InfoPage}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: "#151515" },
            headerShadowVisible: false,
            headerTintColor: "#0A9B97",
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{
              headerTitle: "",
            }}
          />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen
            name="UserTabs"
            component={UserTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="IntroductionPages"
            component={IntroductionPages}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
