import React, { useContext } from "react";
import { Alert } from "react-native";
import { List } from "react-native-paper";
import { PedidoContext } from "../../context/pedido/PedidoContext";
import { DescriptionUi } from "./DescriptionUi";
import { ImageListUi } from "./ImageListUi";
import { SeparatorUi } from "./SeparatorUi";
import { useNavigation } from "@react-navigation/native";

export const ListUi = ({ item, index, nav = false }) => {
  const { image, name, category, total, id } = item;
  const navigation = useNavigation();
  const { seleccionarPlatillo, eliminarCarrito } = useContext(PedidoContext);
  const { alert } = Alert;

  const eliminarPregunta = () => {
    alert(
      "¿Esta seguro que quieres eliminar?",
      "Si lo elimina no podra volver atras",
      [
        { text: "Eliminar", style: "cancel", onPress: () => eliminar() },
        { text: "No eliminar" },
      ]
    );
  };

  const eliminar = () => {
    eliminarCarrito(id);
  };

  return (
    <List.Section>
      {nav && <SeparatorUi category={category} index={index} />}
      <List.Item
        onPress={() => {
          if (nav) {
            seleccionarPlatillo(item);
            navigation.navigate("DestallesPlatillosView");
          } else {
            alert("Total", `Total del producto $ ${total}`, [
              { text: "Listo" },
              { text: "Eliminar", onPress: () => eliminarPregunta() },
            ]);
          }
        }}
        title={name}
        titleStyle={{ fontWeight: "bold" }}
        style={{
          borderBottomColor: "#787878",
          borderStyle: "solid",
          borderBottomWidth: 1,
        }}
        description={() => <DescriptionUi item={item} />}
        left={() => <ImageListUi image={image} />}
      />
    </List.Section>
  );
};
