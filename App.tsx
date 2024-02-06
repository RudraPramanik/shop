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




const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const InsideStack = createNativeStackNavigator();


//insideLayout is the protected route when user loggedin only can visit it
function InsideLayout({ }) {

  return (
    <Drawer.Navigator
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={Home}  />
    </Drawer.Navigator>
 
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      console.log("user", user);
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
            name="Assessment"
            component={InsideLayout}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={Details} // Add the Details component as a screen
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
