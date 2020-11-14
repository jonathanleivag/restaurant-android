import React from "react";
import { Image } from "react-native";

export const ImageListUi = ({ image }) => {
  return (
    <Image
      style={{ width: 80, height: 80, marginTop: 10 }}
      source={{ uri: image }}
    />
  );
};
