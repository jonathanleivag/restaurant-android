import React from "react";
import { View } from "react-native";
import { styles } from "../../assets/global";
import { Text } from "react-native-paper";

export const DescriptionUi = ({ item }) => {
  const { description, price, cantidad, total } = item;
  // console.log(cantidad);
  return (
    <View style={styles.contenedor}>
      <Text> {description} </Text>
      <Text style={{ color: "#707070" }}>
        Precio: $ {price} {cantidad && `x${cantidad}`}
        <Text style={{ fontWeight: "bold" }}>{total && ` $ ${total}`}</Text>
      </Text>
    </View>
  );
};
