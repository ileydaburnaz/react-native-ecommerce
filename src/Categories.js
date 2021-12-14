import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { Card } from "react-native-elements";

const Categories = () => {
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
        {categories &&
          categories.map((item, key) => (
            <Card key={key}>
              <Card.Title>{item.name}</Card.Title>
            </Card>
          ))}
      </ScrollView>
    </>
  );
};

export default Categories;
