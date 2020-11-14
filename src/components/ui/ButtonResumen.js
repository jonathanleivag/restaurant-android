import React, { Fragment, useContext } from "react";
import { Text, Button } from "react-native-paper";
import { styles } from "../../assets/global";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PedidoContext } from "../../context/pedido/PedidoContext";
export const ButtonResumen = () => {
  const navigation = useNavigation();
  const { pedido } = useContext(PedidoContext);

  return (
    <Fragment>
      {pedido.length ? (
        <Button
          style={styles.boton}
          onPress={() => navigation.navigate("ResumenPedidoView")}
        >
          <Text style={styles.botonTexto}>
            <Entypo name="shopping-cart" size={24} color="black" />
          </Text>
        </Button>
      ) : null}
    </Fragment>
  );
};
