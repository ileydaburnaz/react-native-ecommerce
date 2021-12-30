import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";

const Categories = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState(true);
  const [name, setName] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    fetch("https://northwind.vercel.app/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  };

  const categoriesDelete = (id) => {
    let requestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch("https://northwind.vercel.app/api/categories/" + id, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        alert("category delete");
        getCategories();
      });
  };

  const sortdescription = () => {
    setDescription(!description);
    if (description == true) {
      let sortdata = _.orderBy(categories, ["description"], ["asc"]);
      setCategories(sortdata);
    } else {
      let sortdata = _.orderBy(categories, ["description"], ["desc"]);
      setCategories(sortdata);
    }
  };

  const sortname = () => {
    setName(!name);
    if (name == true) {
      let sortdata = _.orderBy(categories, ["name"], ["asc"]);
      setCategories(sortdata);
    } else {
      let sortdata = _.orderBy(categories, ["name"], ["desc"]);
      setCategories(sortdata);
    }
  };
  const searchname = (name) => {
    fetch("https://northwind.vercel.app/api/categories")
      .then((res) => res.json())
      .then((data) => {
        let filteredCategories = data.filter((q) =>
          q.name.toLowerCase().includes(name)
        );
        setCategories(filteredCategories);
      });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.btn}>
          <Button
            title='Add Categories'
            onPress={() => navigation.navigate("CategoriesForm")}
            style={styles.button}
          ></Button>
          <Button
            title='Sort By Name'
            onPress={sortname}
            style={styles.button}
          ></Button>
          <Button
            title='Sort By Description'
            onPress={sortdescription}
            style={styles.button}
          ></Button>
        </View>
        <View style={styles.txt}>
          <TextInput
            placeholder=' Search By Name'
            style={styles.input}
            onChangeText={searchname}
          ></TextInput>
        </View>

        {categories &&
          categories.map((item, key) => (
            <Card key={key}>
              <Card.Title>
                {item.name}--{item.description}
              </Card.Title>
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
                <Button
                  title='Delete'
                  style={styles.button}
                  onPress={() => categoriesDelete(item.id)}
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

export default Categories;
