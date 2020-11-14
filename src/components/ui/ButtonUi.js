import React, { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const ButtonUi = ({ icon, onPress }) => {
  const [onPressIn, setOnPressIn] = useState(false);
  const [color, setColor] = useState("#fff");

  const handlerOnPressIn = () => {
    setOnPressIn(true);
    setColor("#000");
  };

  const handlerOnPressOut = () => {
    setOnPressIn(false);
    setColor("#fff");
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlerOnPressIn}
      onPressOut={handlerOnPressOut}
    >
      <View style={onPressIn ? style.buttonTrue : style.button}>
        <View style={style.contenedorIcon}>
          <MaterialIcons
            style={style.icon}
            name={icon}
            size={30}
            color={color}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  icon: {
    textAlign: "center",
    fontWeight: "bold",
  },
  contenedorIcon: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    width: 100,
    height: 100,
    backgroundColor: "#000",
  },
  buttonTrue: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
  },
});
