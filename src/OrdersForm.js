import React from "react";
import { Formik, useField } from "formik";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import * as Yup from "yup";
import { string } from "yup/lib/locale";

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
        alert("Order added");
      });
  };

  const validate = Yup.object().shape({
    id: Yup.number().required("İd is required"),
    customerId: Yup.string().required("Customer id is required"),
    shipVia: Yup.number().required("Ship Via is required"),
    freight: Yup.number().required("Freight is required"),
  });

  return (
    <>
      <Formik
        initialValues={{ id: "", customerId: "", shipVia: "", freight: "" }}
        onSubmit={(values) => addOrders(values)}
        validationSchema={validate}
      >
        {({ handleChange, handleSubmit, values, touched, isValid, errors }) => (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("id")}
              value={values.id}
              placeholder='Id'
            />
            {errors.id && touched.id && (
              <Text style={styles.errorMessage}>{errors.id}</Text>
            )}

            <TextInput
              style={styles.input}
              onChangeText={handleChange("customerId")}
              value={values.customerId}
              placeholder='Customer Id'
            />
            {errors.customerId && touched.customerId && (
              <Text style={styles.errorMessage}>{errors.customerId}</Text>
            )}

            <TextInput
              style={styles.input}
              onChangeText={handleChange("shipVia")}
              value={values.shipVia}
              placeholder='Ship Via'
            />
            {errors.shipVia && touched.shipVia && (
              <Text style={styles.errorMessage}>{errors.shipVia}</Text>
            )}

            <TextInput
              style={styles.input}
              onChangeText={handleChange("freight")}
              value={values.freight}
              placeholder='Freight'
            />
            {errors.freight && touched.freight && (
              <Text style={styles.errorMessage}>{errors.shipVia}</Text>
            )}
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
    color: "black",
    marginHorizontal: 400,
    margin: 9,
  },
  input: {
    padding: 5,
    borderWidth: 1,
    margin: 9,
    height: 50,
    marginHorizontal: 400,
  },
  errorMessage: {
    marginHorizontal: 400,
    color: "red",
  },
});

export default OrdersForm;
