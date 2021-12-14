import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView, StyleSheet } from "react-native";
import { View, Text, FlatList, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";

const Orders = ({ navigation }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch("https://northwind.vercel.app/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);
  return (
    <>
      <ScrollView>
        {product &&
          product.map((item, key) => (
            <Card key={key}>
              <Card.Title>{item.customerId}</Card.Title>
              <Card.Divider />
              <View style={styles.btn}>
                <Button
                  title='Detail'
                  onPress={() =>
                    navigation.navigate("OrdersDetail", { ordersItem: item })
                  }
                  style={styles.button}
                />
              </View>
            </Card>
          ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 150,
    backgroundColor: "black",
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Orders;
