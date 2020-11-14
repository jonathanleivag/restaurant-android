import React, { useReducer } from "react";
import { FirebaseReducer } from "./FirebaseReducer";
import { FirebaseContext } from "./FirebaseContex";
import { firebase } from "../../firebase/index";
import { OBTENER_PRODUCTOS_EXITO } from "../../types";
import _ from "lodash";
export const FirebaseState = ({ children }) => {
  const initialState = { menu: [] };

  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  const obtenerProducto = () => {
    firebase.db
      .collection("products")
      .where("existencia", "==", true)
      .onSnapshot(manejarSnapshpt);
  };

  const manejarSnapshpt = (snapshot) => {
    let platillos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    platillos = _.sortBy(platillos, "category");
    dispatch({ type: OBTENER_PRODUCTOS_EXITO, payload: platillos });
  };

  return (
    <FirebaseContext.Provider
      value={{ menu: state.menu, firebase, obtenerProducto }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
