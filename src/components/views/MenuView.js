import React, { useContext, useEffect } from "react";
import { FlatList } from "react-native";
import { FirebaseContext } from "../../context/firebase/FirebaseContex";
import { ListUi } from "../ui/ListUi";

export const MenuView = () => {
  const { obtenerProducto, menu } = useContext(FirebaseContext);

  useEffect(() => {
    obtenerProducto();
  }, []);

  return (
    <FlatList
      data={menu}
      renderItem={({ item, index }) => (
        <ListUi item={item} index={index} nav={true} />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};
