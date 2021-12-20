import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";

const Orders = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getorders();
  }, []);

  const getorders = () => {
    fetch("https://northwind.vercel.app/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  };

  const ordersdelete = (id) => {
    let requestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch("https://northwind.vercel.app/api/orders/" + id, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        alert("order delete");
        getorders();
      });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.btn}>
          <Button
            title='Add Orders'
            onPress={() => navigation.navigate("OrdersForm")}
            style={styles.button}
          ></Button>
        </View>
        {orders &&
          orders.map((item, key) => (
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
                <Button
                  title='Delete'
                  style={styles.button}
                  onPress={() => ordersdelete(item.id)}
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
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 12,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Orders;
