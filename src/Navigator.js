import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Orders from "./Orders";
import Categories from "./Categories";
import Suppliers from "./Suppliers";

const Tab = createBottomTabNavigator();

const Navigator = ({ navigation }) => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name='Categories'
          component={Categories}
          options={{
            tabBarLabel: "Categories",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='copy-outline' color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name='Orders'
          component={Orders}
          options={{
            tabBarLabel: "Orders",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name='reorder-three-outline'
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Suppliers'
          component={Suppliers}
          options={{
            tabBarLabel: "Suppliers",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='grid-outline' color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Navigator;
