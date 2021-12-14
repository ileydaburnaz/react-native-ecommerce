import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { Card } from "react-native-elements";

const Orders = () => {
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
              <Card.Title>{item.shipName}</Card.Title>
            </Card>
          ))}
      </ScrollView>
    </>
  );
};

export default Orders;
