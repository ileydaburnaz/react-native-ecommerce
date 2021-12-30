import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";

const Suppliers = ({ navigation }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [companyName, setCompanyName] = useState(true);
  const [contactName, setContactName] = useState(true);

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = () => {
    fetch("https://northwind.vercel.app/api/suppliers")
      .then((res) => res.json())
      .then((data) => {
        setSuppliers(data);
      });
  };

  const suppliersDelete = (id) => {
    let requestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch("https://northwind.vercel.app/api/suppliers/" + id, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        alert("suppliers delete");
        setSuppliers();
      });
  };

  const sortcompanyname = () => {
    setCompanyName(!companyName);
    if (companyName == true) {
      let sortdata = _.orderBy(suppliers, ["companyName"], ["asc"]);
      setSuppliers(sortdata);
    } else {
      let sortdata = _.orderBy(suppliers, ["companyName"], ["desc"]);
      setSuppliers(sortdata);
    }
  };

  const sortscontactname = () => {
    setContactName(!contactName);
    if (contactName == true) {
      let sortdata = _.orderBy(suppliers, ["contactName"], ["asc"]);
      setSuppliers(sortdata);
    } else {
      let sortdata = _.orderBy(suppliers, ["contactName"], ["desc"]);
      setSuppliers(sortdata);
    }
  };

  const searchcompanyname = (companyName) => {
    fetch("https://northwind.vercel.app/api/suppliers")
      .then((res) => res.json())
      .then((data) => {
        let filteredSuppliers = data.filter((q) =>
          q.companyName.toLowerCase().includes(companyName)
        );
        setSuppliers(filteredSuppliers);
      });
  };
  return (
    <>
      <ScrollView>
        <View style={styles.btn}>
          <Button
            title='Add Suppliers'
            onPress={() => navigation.navigate("SuppliersForm")}
            style={styles.button}
          ></Button>
          <Button
            title='Sort By Company Name'
            onPress={sortcompanyname}
            style={styles.button}
          ></Button>
          <Button
            title='Sort By Contact Name'
            onPress={sortscontactname}
            style={styles.button}
          ></Button>
        </View>
        <View style={styles.txt}>
          <TextInput
            placeholder=' Search By Company Name'
            style={styles.input}
            onChangeText={searchcompanyname}
          ></TextInput>
        </View>

        {suppliers &&
          suppliers.map((item, key) => (
            <Card key={key}>
              <Card.Title>
                {item.companyName}--{item.contactName}
              </Card.Title>
              <Card.Divider />
              <View style={styles.btn}>
                <Button
                  title='Detail'
                  onPress={() =>
                    navigation.navigate("SuppliersDetail", {
                      suppliersItem: item,
                    })
                  }
                  style={styles.button}
                />
                <Button
                  title='Delete'
                  style={styles.button}
                  onPress={() => suppliersDelete(item.id)}
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
    width: 250,
    backgroundColor: "black",
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 12,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  txt: {
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    width: 200,
    height: 42,
    margin: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    textAlign: "center",
  },
});

export default Suppliers;
