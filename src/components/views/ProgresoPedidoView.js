import React, { Fragment, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { PedidoContext } from "../../context/pedido/PedidoContext";
import { firebase } from "../../firebase/index";
import { styles } from "../../assets/global";
import { Text, Button } from "react-native-paper";
import Countdown from "react-countdown";
import { useNavigation } from "@react-navigation/native";

export const ProgresoPedidoView = () => {
  const { idPedido } = useContext(PedidoContext);
  const [tiempo, setTiempo] = useState(0);
  const [completado, setCompletado] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    const obtenerProducto = () => {
      firebase.db
        .collection("ordenes")
        .doc(idPedido)
        .onSnapshot((doc) => {
          setTiempo(doc.data().tiempoentrega);
          setCompletado(doc.data().completado);
        });
    };
    obtenerProducto();
  }, []);

  const tiempoRestante = ({ minutes, seconds }) => {
    return (
      <Fragment>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.titulo}>Tiempo Restante para su pedido</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.titulo}>
            {minutes}:{seconds}
          </Text>
        </View>
        {minutes === 0 && seconds === 0 && (
          <Fragment>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View>
                <Text style={styles.titulo}>Lo sentimos</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text>Estamos atrasado con su pedido :'c</Text>
            </View>
          </Fragment>
        )}
      </Fragment>
    );
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.contenido}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          {tiempo === 0 && (
            <Fragment>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <View>
                  <Text style={styles.titulo}>Hemos recivido su oreden</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text>Estamos calculando el tiempo de entrega</Text>
              </View>
            </Fragment>
          )}
          {tiempo > 0 && !completado && (
            <View>
              <Countdown
                date={Date.now() + tiempo * 60000}
                renderer={tiempoRestante}
              />
            </View>
          )}
          {completado && (
            <Fragment>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <View>
                  <Text style={styles.titulo}>Listo</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text>Pase a retirar su pedido</Text>
              </View>
              <Button
                style={[styles.boton, { marginTop: 30 }]}
                onPress={() => navigation.navigate("NuevaOrdenView")}
              >
                <Text style={styles.botonTexto}>Comenzar una orden nueva</Text>
              </Button>
            </Fragment>
          )}
        </View>
      </View>
    </View>
  );
};
