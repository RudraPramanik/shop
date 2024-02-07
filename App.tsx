import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import Home from "./app/screens/Home";
import Details from "./app/screens/Details";
import Login from "./app/screens/Login";
import { User, onAuthStateChanged } from "firebase/auth";
import { UserContext } from "./app/context/UserContext";
import Favorite from "./app/screens/Favourite";




const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const InsideStack = createNativeStackNavigator();


function InsideLayout({ }) {

  return (
    <Drawer.Navigator
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={Home}  />
      <Drawer.Screen name="Favourite" component={Favorite}  />
    </Drawer.Navigator>
 
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser}}>
    <NavigationContainer>
      {/* conditionally render auth route or protected route */}
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <>
          <Stack.Screen
            name="Task"
            component={InsideLayout}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={Details} 
          />
        </>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: true }}
          />
        )}
      </Stack.Navigator>     
      </NavigationContainer>
    </UserContext.Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
