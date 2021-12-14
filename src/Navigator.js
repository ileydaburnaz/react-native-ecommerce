import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Navigator = ({ navigation }) => {
  return (
    <>
      <TabNavigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: "Anasayfa",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='home-outline' color={color} size={size} />
            ),
          }}
        />
      </TabNavigator>
    </>
  );
};

export default Navigator;
