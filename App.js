import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Orders from "./src/Orders";
import Navigator from "./src/Navigator";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='AppTabNavigator'>
          <Stack.Screen
            name='Navigator'
            component={Navigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Orders'
            component={Orders}
            options={{ title: "Orders Screen" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
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
