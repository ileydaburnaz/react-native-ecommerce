import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Orders from "./src/Orders";
import Navigator from "./src/Navigator";
import Categories from "./src/Categories";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Orders'>
          <Stack.Screen
            name='Navigator'
            component={Navigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name='Orders' component={Orders} />
          <Stack.Screen name='Categories' component={Categories} />
        </Stack.Navigator>
        <Categories></Categories>
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
