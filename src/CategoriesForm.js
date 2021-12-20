import React from "react";
import { Formik, useField } from "formik";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import * as Yup from "yup";
import { string } from "yup/lib/locale";

const CategoriesForm= ({ navigation }) => {
  const addCategories = (values) => {
    let requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: Number(values.id),
        description: values.description,
        name: values.name,
        
      }),
    };

    fetch("https://northwind.vercel.app/api/categories", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        alert("Categories added");
      });
  };

  const validate = Yup.object().shape({
    id: Yup.number().required("İd is required"),
    description: Yup.string().required("Description is required"),
    name: Yup.string().required("Name is required"),
    
  });

  return (
    <>
      <Formik
        initialValues={{ id: "", description: "", name: ""}}
        onSubmit={(values) => addCategories(values)}
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
              onChangeText={handleChange("description")}
              value={values.description}
              placeholder='Description'
            />
            {errors.description && touched.description && (
              <Text style={styles.errorMessage}>{errors.description}</Text>
            )}

            <TextInput
              style={styles.input}
              onChangeText={handleChange("name")}
              value={values.name}
              placeholder='Name'
            />
            {errors.name && touched.name && (
              <Text style={styles.errorMessage}>{errors.name}</Text>
            )}

         
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
  errorMessage: {
    marginHorizontal: 400,
    color: "red",
  },
});

export default CategoriesForm ;
