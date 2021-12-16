import React from "react";
import { Formik } from "formik";
import { View, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const CategoriesForm = ({ navigation }) => {
  const addCategories = (values) => {
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

    fetch("https://northwind.vercel.app/api/categories", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        alert("Category Added");
      });
  };
  return (
    <>
      <Formik
        initialValues={{ id: "", description: "", name: "" }}
        onSubmit={(values) => addCategories(values)}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <TextInput
              onChangeText={handleChange("id")}
              value={values.id}
              placeholder='Id'
              style={styles.input}
            />
            <TextInput
              onChangeText={handleChange("description")}
              value={values.customerId}
              placeholder='Description'
              style={styles.input}
            />

            <TextInput
              onChangeText={handleChange("name")}
              value={values.shipVia}
              placeholder='Name'
              style={styles.input}
            />

            <View>
              <Button
                title='Add Categories'
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
});

export default CategoriesForm;
