import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { styles } from "../../assets/global";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const NuevaOrdenView = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.contenedor}>
      <View style={[styles.contenido, style.contenido]}>
        <Button
          mode="contained"
          style={styles.boton}
          onPress={() => navigation.navigate("MenuView")}
          icon={() => (
            <MaterialCommunityIcons name="food" size={25} color="black" />
          )}
        >
          <Text style={styles.botonTexto}>Crear nueva orden</Text>
        </Button>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  contenido: {
    flexDirection: "column",
    justifyContent: "center",
  },
});
