import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Card } from "react-native-elements";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetch("https://northwind.vercel.app/api/suppliers")
      .then((res) => res.json())
      .then((data) => {
        setSuppliers(data);
      });
  }, []);
  return (
    <>
      <View>
        {suppliers &&
          suppliers.map((item, key) => (
            <Card key={key}>
              <Card.Title>{item.companyName}</Card.Title>
            </Card>
          ))}
      </View>
    </>
  );
};

export default Suppliers;
