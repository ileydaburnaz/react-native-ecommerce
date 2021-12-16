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
        alert("Tebrikler, tedarikçi eklediniz!");
      });
  };
  return (
    <>
      <Formik
        initialValues={{ id: "", companyName: "", contactName: "", contactTitle: ""}}
        onSubmit={(values) => addSuppliers(values)}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <TextInput
              onChangeText={handleChange("id")}
              value={values.id}
              placeholder='Id'
            />
            <TextInput
              onChangeText={handleChange("companyName")}
              value={values.companyName}
              placeholder='Company Name'
            />

            <TextInput
              onChangeText={handleChange("contactName")}
              value={values.contactName}
              placeholder='Contact Name'
            />

            <TextInput
              onChangeText={handleChange("contactTitle")}
              value={values.contactTitle}
              placeholder='Contact Title'
            />
            <View>
              <Button
                title='ADD A SUPPLIER'
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

export default SuppliersForm;
