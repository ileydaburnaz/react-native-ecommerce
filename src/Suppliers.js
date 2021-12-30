import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";

const Suppliers = ({ navigation }) => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = () => {
    fetch("https://northwind.vercel.app/api/suppliers")
      .then((res) => res.json())
      .then((data) => {
        setSuppliers(data);
      });
  };

  const suppliersDelete = (id) => {
    let requestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch("https://northwind.vercel.app/api/suppliers/" + id, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        alert("suppliers delete");
        setSuppliers();
      });
  };
  return (
    <>
      <ScrollView>
        <View style={styles.btn}>
          <Button
            title='Add Suppliers'
            onPress={() => navigation.navigate("SuppliersForm")}
            style={styles.button}
          ></Button>
        </View>
        {suppliers &&
          suppliers.map((item, key) => (
            <Card key={key}>
              <Card.Title>{item.companyName}</Card.Title>
              <Card.Divider />
              <View style={styles.btn}>
                <Button
                  title='Detail'
                  onPress={() =>
                    navigation.navigate("SuppliersDetail", {
                      suppliersItem: item,
                    })
                  }
                  style={styles.button}
                />
                <Button
                  title='Delete'
                  style={styles.button}
                  onPress={() => suppliersDelete(item.id)}
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
    marginTop: 15,
    marginBottom: 15,
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
});

export default Suppliers;
