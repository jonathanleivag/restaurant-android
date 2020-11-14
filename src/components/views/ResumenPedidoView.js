import React, { useContext, useEffect } from "react";
import { FlatList, Text, View, Alert } from "react-native";
import { PedidoContext } from "../../context/pedido/PedidoContext";
import { ListUi } from "../ui/ListUi";
import { styles } from "../../assets/global";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../firebase/index";

export const ResumenPedidoView = () => {
  const { pedido, total, mostrarResumen, pedidoOrdenado } = useContext(
    PedidoContext
  );
  const navigation = useNavigation();
  const { alert } = Alert;

  useEffect(() => {
    calcularTotal();
    if (!pedido.length) {
      navigation.navigate("MenuView");
    }
  }, [pedido]);

  const calcularTotal = () => {
    let nuevoTotal = 0;
    nuevoTotal = pedido.reduce(
      (nuevoTotal, articulo) => nuevoTotal + articulo.total,
      0
    );
    mostrarResumen(nuevoTotal);
  };

  const handlerOrdenarPedido = () => {
    alert(
      "Revisa tu pedido",
      "Una vez que realizas el pedido no podras modificarlo",
      [
        {
          text: "Confirmar",
          onPress: () => {
            ordenar();
          },
        },
        { text: "Revisar", style: "cancel" },
      ]
    );
  };

  const ordenar = async () => {
    const pedidoObj = {
      tiempoentrega: 0,
      completado: false,
      total: Number(total),
      orden: pedido,
      creado: Date.now(),
    };

    try {
      const pedido = await firebase.db.collection("ordenes").add(pedidoObj);
      pedidoOrdenado(pedido.id);
      navigation.navigate("ProgresoPedidoView");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.contenido}>
      <Text style={styles.titulo}>Resumen de pedido</Text>
      <FlatList
        data={pedido}
        renderItem={({ item, index }) => <ListUi item={item} index={index} />}
        keyExtractor={({ id }) => id + new Date() / 1000}
      />
      <Text style={styles.cantidad}> Total a pagar: $ {total} </Text>
      <View
        style={[styles.contenido, { marginTop: 30, marginBottom: 30 }]}
      ></View>
      <Button
        style={{ backgroundColor: "#000", marginBottom: 30 }}
        onPress={() => navigation.navigate("MenuView")}
      >
        <Text style={{ color: "#fff" }}>Seguir pidiendo</Text>
      </Button>
      <Button
        style={[styles.boton, { marginBottom: 40 }]}
        onPress={handlerOrdenarPedido}
      >
        <Text style={styles.botonTexto}>Ordenar pedido</Text>
      </Button>
    </View>
  );
};
