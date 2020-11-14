import React, { useReducer } from "react";
import { PedidoReducer } from "./PedidoReducer";
import { PedidoContext } from "./PedidoContext";
import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_ORDENAR_PLATILLO,
  MOSTRAR_RESUMEN,
  ELIMINAR_PRODUCTO_CARRITO,
  PEDIDO_ORDENADO,
} from "../../types";

export const PedidoState = ({ children }) => {
  const initialState = { pedido: [], platillo: null, total: 0, idPedido: "" };
  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  const seleccionarPlatillo = (platillo) => {
    dispatch({ type: SELECCIONAR_PRODUCTO, payload: platillo });
  };

  const confirmarOrdenarPedido = (pedido) => {
    dispatch({ type: CONFIRMAR_ORDENAR_PLATILLO, payload: pedido });
  };

  const mostrarResumen = (total) => {
    dispatch({ type: MOSTRAR_RESUMEN, payload: total });
  };

  const eliminarCarrito = (id) => {
    dispatch({ type: ELIMINAR_PRODUCTO_CARRITO, payload: id });
  };

  const pedidoOrdenado = (id) => {
    dispatch({ type: PEDIDO_ORDENADO, payload: id });
  };

  return (
    <PedidoContext.Provider
      value={{
        pedido: state.pedido,
        seleccionarPlatillo,
        platillo: state.platillo,
        confirmarOrdenarPedido,
        total: state.total,
        mostrarResumen,
        eliminarCarrito,
        pedidoOrdenado,
        idPedido: state.idPedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};
