import React from "react";
import { Formik } from "formik";
import { View, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import * as Yup from "yup";

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

  const validate = Yup.object().shape({
    id: Yup.number().required("İd is required"),
    companyName: Yup.string().required("Company Name is required"),
    contactName: Yup.string().required("Contact Name is required"),
    contactTitle: Yup.string().required("contact Title is required"),
  });
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
        validationSchema={validate}
      >
        {({ handleChange, handleSubmit, values, touched, isValid, errors }) => (
          <View>
            <TextInput
              onChangeText={handleChange("id")}
              value={values.id}
              placeholder='Id'
              style={styles.input}
            />
            {errors.id && touched.id && (
              <Text style={styles.errorMessage}>{errors.id}</Text>
            )}
            <TextInput
              onChangeText={handleChange("companyName")}
              value={values.companyName}
              placeholder='Company Name'
              style={styles.input}
            />
            {errors.companyName && touched.companyName && (
              <Text style={styles.errorMessage}>{errors.companyName}</Text>
            )}

            <TextInput
              onChangeText={handleChange("contactName")}
              value={values.contactName}
              placeholder='Contact Name'
              style={styles.input}
            />
            {errors.contactName && touched.contactName && (
              <Text style={styles.errorMessage}>{errors.contactName}</Text>
            )}

            <TextInput
              onChangeText={handleChange("contactTitle")}
              value={values.contactTitle}
              placeholder='Contact Title'
              style={styles.input}
            />
            {errors.contactTitle && touched.contactTitle && (
              <Text style={styles.errorMessage}>{errors.contactTitle}</Text>
            )}
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
  errorMessage: {
    marginHorizontal: 400,
    color: "red",
  },
});

export default SuppliersForm;
