import React from "react";
import { Card } from "react-native-elements";
import { View, Text } from "react-native";

const CategoriesDetail = ({ navigation, route }) => {
  const { categoriesItem } = route.params;
  return (
    <>
      <View>
        <Card>
          <Card.Title>{categoriesItem.name}</Card.Title>
          <Card.Divider />
          <View>
            <Text>ID: {categoriesItem?.id}</Text>
            <Text>Description: {categoriesItem?.description}</Text>
            <Text>Name: {categoriesItem?.name}</Text>
          </View>
        </Card>
      </View>
    </>
  );
};

export default CategoriesDetail;
