import React from "react";
import { Card } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";

const OrdersDetail = ({ navigation, route }) => {
  const { ordersItem } = route.params;
  return (
    <>
      <View>
        <Card>
          <Card.Title>{ordersItem.customerId}</Card.Title>
          <Card.Divider />
          <View>
            <Text>ID: {ordersItem?.shipName}</Text>
            <Text>Ship Via: {ordersItem?.shipVia}</Text>
            <Text>Freight: {ordersItem?.freight}</Text>
          </View>
        </Card>
      </View>
    </>
  );
};
export default OrdersDetail;
