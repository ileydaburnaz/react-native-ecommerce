import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";

const Orders = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [customerId, setCustomerId] = useState(true);
  const [shipName, setShipName] = useState(true);

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

  const sortcustomerid = () => {
    setCustomerId(!customerId);
    if (customerId == true) {
      let sortdata = _.orderBy(orders, ["customerId"], ["asc"]);
      setOrders(sortdata);
    } else {
      let sortdata = _.orderBy(orders, ["customerId"], ["desc"]);
      setOrders(sortdata);
    }
  };

  const sortshipname = () => {
    setShipName(!shipName);
    if (shipName == true) {
      let sortdata = _.orderBy(orders, ["shipName"], ["asc"]);
      setOrders(sortdata);
    } else {
      let sortdata = _.orderBy(orders, ["shipName"], ["desc"]);
      setOrders(sortdata);
    }
  };

  const searchcustomerid = (customerId) => {
    fetch("https://northwind.vercel.app/api/orders")
      .then((res) => res.json())
      .then((data) => {
        let filteredOrders = data.filter((q) =>
          q.customerId.toLowerCase().includes(customerId)
        );
        setOrders(filteredOrders);
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
          <Button
            title='Sort By Customer Id'
            onPress={sortcustomerid}
            style={styles.button}
          ></Button>
          <Button
            title='Sort By Ship Name'
            onPress={sortshipname}
            style={styles.button}
          ></Button>
        </View>
        <View style={styles.txt}>
          <TextInput
            placeholder=' Search By Customer Id'
            style={styles.input}
            onChangeText={searchcustomerid}
            autoFocus={true}
          ></TextInput>
          <Button
            title='Search'
            style={styles.button}
            onPress={searchcustomerid}
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
    width: 200,
    backgroundColor: "black",
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 12,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  txt: {
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    height: 42,
    margin: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
  },
});

export default Orders;
