import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  contenido: {
    flex: 1,
    marginHorizontal: "2.5%",
  },
  boton: {
    backgroundColor: "#FFDA00",
    borderRadius: 40,
    padding: 10,
  },
  botonTexto: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 15,
    color: "#000",
  },
  icon: {
    marginTop: 30,
  },
  titulo: {
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  cantidad: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 24,
  },
});
