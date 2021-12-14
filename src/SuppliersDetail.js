import React from "react";
import { Card } from "react-native-elements";
import { View, Text } from "react-native";

const SuppliersDetail = ({ navigation, route }) => {
  const { suppliersItem } = route.params;
  return (
    <>
      <View>
        <Card>
          <Card.Title>{suppliersItem.companyName}</Card.Title>
          <Card.Divider />
          <View>
            <Text>Company Name: {suppliersItem?.companyName}</Text>
            <Text>Contact Name: {suppliersItem?.contactName}</Text>
            <Text>Contact Title: {suppliersItem?.contactTitle}</Text>
          </View>
        </Card>
      </View>
    </>
  );
};

export default SuppliersDetail;
