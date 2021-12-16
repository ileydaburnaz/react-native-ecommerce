import React from "react";
import { Formik } from "formik";
import { View, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const SuppliersForm = ({ navigation }) => {
  const addSuppliers = (values) => {
    let requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: Number(values.id),
        companyName: values.companyName,
        contactName: values.contactName,
        contactTitle: values.contactTitle,
      }),
    };

    fetch("https://northwind.vercel.app/api/suppliers", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        alert("Suppliers added");
      });
  };
  return (
    <>
      <Formik
        initialValues={{
          id: "",
          companyName: "",
          contactName: "",
          contactTitle: "",
        }}
        onSubmit={(values) => addSuppliers(values)}
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
              onChangeText={handleChange("companyName")}
              value={values.companyName}
              placeholder='Company Name'
              style={styles.input}
            />

            <TextInput
              onChangeText={handleChange("contactName")}
              value={values.contactName}
              placeholder='Contact Name'
              style={styles.input}
            />

            <TextInput
              onChangeText={handleChange("contactTitle")}
              value={values.contactTitle}
              placeholder='Contact Title'
              style={styles.input}
            />
            <View>
              <Button
                title='Add Suppliers'
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

export default SuppliersForm;
