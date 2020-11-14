import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Alert } from "react-native";
import { styles } from "../../assets/global";
import { PedidoContext } from "../../context/pedido/PedidoContext";
import { Text, Button } from "react-native-paper";
import { ButtonUi } from "../ui/ButtonUi";
import { useNavigation } from "@react-navigation/native";

export const FormularioPlatilloView = () => {
  const [num, setNum] = useState("1");
  const [priceTotal, setPriceTotal] = useState(0);
  const { platillo, confirmarOrdenarPedido, pedido } = useContext(
    PedidoContext
  );
  const { price } = platillo;
  const navigation = useNavigation();
  const { alert } = Alert;

  useEffect(() => {
    calularPrice();
  }, [num]);

  useEffect(() => {
    pedido.map(({ id }) => {
      if (id === platillo.id) {
        alert(
          "El pedido ya existe",
          "Puedes ir al resumen o puede ir al menu",
          [
            { text: "Ir al Menu", onPress: () => navigation.navigate("MenuView") },
            {
              text: "ir al Resumen",
              onPress: () => navigation.navigate("ResumenPedidoView"),
            },
          ]
        );
      }
    });
  }, []);

  const remove = () => {
    if (parseInt(num) > 1) {
      const numNew = parseInt(num) - 1;
      setNum(numNew.toString());
    } else {
      alert(
        "Error",
        "Ingrese un numero mayor a 1 y menor a 30",
        [{ text: "Entiendo" }],
        { cancelable: false }
      );
    }
  };

  const add = async () => {
    if (parseInt(num) < 30) {
      const numNew = parseInt(num) + 1;
      setNum(numNew.toString());
    } else {
      alert(
        "Supero el numero del pedido",
        "Ingrese un numero mayor a 1 y menor a 30",
        [{ text: "Entiendo" }],
        { cancelable: false }
      );
    }
  };

  const onChangeText = (text) => {
    if ((text >= 1 && text <= 30) || text === "") {
      setNum(text);
    } else {
      alert(
        "Error",
        "Ingrese un numero mayor a 1 y menor a 30",
        [{ text: "Entiendo" }],
        { cancelable: false }
      );
    }
  };

  const calularPrice = () => {
    if (num === "") {
      setPriceTotal(0);
    } else {
      setPriceTotal(parseInt(price) * parseInt(num));
    }
  };

  const handlerOrdenar = () => {
    alert(
      "¿Deseas confirmar el pedido?",
      "Un pedido confirmado no se podra modificar",
      [
        {
          text: "Confirmar",
          onPress: () => {
            ordenar();
          },
        },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  const ordenar = () => {
    const nuevoPedido = { ...platillo, cantidad: num, total: priceTotal };
    confirmarOrdenarPedido(nuevoPedido);
    navigation.navigate("ResumenPedidoView");
  };

  return (
    <View style={[style.contenedor, styles.contenedor]}>
      <View style={style.contenido}>
        <ButtonUi icon="remove" onPress={remove} />

        <View style={style.input}>
          <TextInput
            style={style.intpuText}
            keyboardType="numeric"
            value={num}
            onChangeText={onChangeText}
          />
        </View>

        <ButtonUi icon="add" onPress={add} />
      </View>
      <Text style={styles.cantidad}>Total a pagar: $ {priceTotal} </Text>
      <Button
        style={[styles.boton, { marginTop: 40 }]}
        onPress={handlerOrdenar}
      >
        <Text style={styles.botonTexto}>Ordenar</Text>
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  contenedor: {
    flexDirection: "column",
    justifyContent: "center",
  },
  contenido: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "2.5%",
  },
  input: {
    width: 100,
    height: 100,
    flexDirection: "column",
    justifyContent: "center",
  },
  intpuText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
});
