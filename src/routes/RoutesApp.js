import React, { useEffect } from "react";

// react native
import { Alert, BackHandler, Platform } from "react-native";

// navegation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

// context
import { FirebaseState } from "../context/firebase/FirebaseState";
import { PedidoState } from "../context/pedido/PedidoState";

// Views
import { DestallesPlatillosView } from "../components/views/DestallesPlatillosView";
import { FormularioPlatilloView } from "../components/views/FormularioPlatilloView";
import { MenuView } from "../components/views/MenuView";
import { ProgresoPedidoView } from "../components/views/ProgresoPedidoView";
import { ResumenPedidoView } from "../components/views/ResumenPedidoView";
import { NuevaOrdenView } from "../components/views/NuevaOrdenView";

// paper
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "../assets/theme";
import { ButtonResumen } from "../components/ui/ButtonResumen";

export const RoutesApp = () => {
  const { alert } = Alert;
  useEffect(() => {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", backAction);
    }
  }, []);

  const backAction = () => {
    alert("¡Espere!", "¿Estás seguro de que quieres salir?", [
      {
        text: "¡No!",
        style: "cancel",
      },
      { text: "¡Si!", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  return (
    <FirebaseState>
      <PedidoState>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: "#FFDA00" },
                headerTitleStyle: { fontWeight: "bold" },
                headerTitleAlign: "center",
                headerTintColor: "#000",
              }}
            >
              <Stack.Screen
                name="NuevaOrdenView"
                component={NuevaOrdenView}
                options={{ title: "Nueva Orden", headerLeft: null }}
              />

              <Stack.Screen
                name="MenuView"
                component={MenuView}
                options={{
                  title: "Nuestro Menú",
                  headerRight: () => <ButtonResumen />,
                }}
              />

              <Stack.Screen
                name="DestallesPlatillosView"
                component={DestallesPlatillosView}
                options={{ title: "Detalle Platillo" }}
              />

              <Stack.Screen
                name="FormularioPlatilloView"
                component={FormularioPlatilloView}
                options={{ title: "Ordenar platillo" }}
              />

              <Stack.Screen
                name="ResumenPedidoView"
                component={ResumenPedidoView}
                options={{ title: "Resumen de pedido", headerLeft: null }}
              />

              <Stack.Screen
                name="ProgresoPedidoView"
                component={ProgresoPedidoView}
                options={{ title: "Pogreso de pedido", headerLeft: null }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PedidoState>
    </FirebaseState>
  );
};
