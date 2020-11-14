import React, { useContext } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "../../assets/global";
import { PedidoContext } from "../../context/pedido/PedidoContext";
import { Button, Card, Paragraph } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
export const DestallesPlatillosView = () => {
  
  const { platillo } = useContext(PedidoContext);
  const { name, image, description, price } = platillo;
  const navigation = useNavigation();

  return (
    <View style={styles.contenedor}>
      <View style={styles.contenido}>
        <Card style={{ marginTop: 20 }}>
          <Card.Title title={name} titleStyle={styles.titulo} />
          <Card.Content>
            <Paragraph>{description}</Paragraph>
          </Card.Content>
          <Card.Cover style={{ marginTop: 20 }} source={{ uri: image }} />
          <Card.Actions>
            <Text style={[styles.cantidad, { marginBottom: 20 }]}>
              Precio: $ {price}
            </Text>
          </Card.Actions>
          <Button
            onPress={() => navigation.navigate("FormularioPlatilloView")}
            style={[styles.boton, { marginBottom: 20 }]}
          >
            <Text style={styles.botonTexto}>Ordenar platillo</Text>
          </Button>
        </Card>
      </View>
    </View>
  );
};
