import React from "react";
import { Formik } from "formik";
import { View, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const OrdersForm = ({ navigation }) => {
  const addOrders = (values) => {
    let requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: Number(values.id),
        customerId: values.customerId,
        shipVia: Number(values.shipVia),
        freight: Number(values.freight),
      }),
    };

    fetch("https://northwind.vercel.app/api/orders", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        alert("order eklendi");
      });
  };
  return (
    <>
      <Formik
        initialValues={{ id: "", customerId: "", shipVia: "", freight: "" }}
        onSubmit={(values) => addOrders(values)}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <TextInput
              onChangeText={handleChange("id")}
              value={values.id}
              placeholder='Id'
            />
            <TextInput
              onChangeText={handleChange("customerId")}
              value={values.customerId}
              placeholder='Customer Id'
            />

            <TextInput
              onChangeText={handleChange("shipVia")}
              value={values.shipVia}
              placeholder='Ship Via'
            />

            <TextInput
              onChangeText={handleChange("freight")}
              value={values.freight}
              placeholder='Freight'
            />
            <View>
              <Button
                title='Add Orders'
                onPress={handleSubmit}
                style={styles.button}
              />
            </View>
          </View>
        )}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 150,
    backgroundColor: "black",
  },
});

export default OrdersForm;
