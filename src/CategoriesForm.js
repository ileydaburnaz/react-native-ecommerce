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
        alert("kategori eklendi");
      });
  };
  return (
    <>
      <Formik
        initialValues={{ id: "", description: "", name: ""}}
        onSubmit={(values) => addCategories(values)}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <TextInput
              onChangeText={handleChange("id")}
              value={values.id}
              placeholder='Id'
            />
            <TextInput
              onChangeText={handleChange("description")}
              value={values.customerId}
              placeholder='Description'
            />

            <TextInput
              onChangeText={handleChange("name")}
              value={values.shipVia}
              placeholder='name'
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
    width: 150,
    backgroundColor: "black",
  },
});

export default CategoriesForm;
