import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";

const Categories = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://northwind.vercel.app/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);
  return (
    <>
      <ScrollView>
        <View style={styles.btn}>
          <Button
            title='Add Categories'
            onPress={() => navigation.navigate("CategoriesForm")}
            style={styles.button}
          ></Button>
        </View>
        {categories &&
          categories.map((item, key) => (
            <Card key={key}>
              <Card.Title>{item.name}</Card.Title>
              <Card.Divider />
              <View style={styles.btn}>
                <Button
                  title='Detail'
                  onPress={() =>
                    navigation.navigate("CategoriesDetail", {
                      categoriesItem: item,
                    })
                  }
                  style={styles.button}
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
    borderRadius: 12,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Categories;
