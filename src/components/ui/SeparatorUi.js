import React, { Fragment, useContext, useState } from "react";
import { useEffect } from "react";
import { List, Text } from "react-native-paper";
import { FirebaseContext } from "../../context/firebase/FirebaseContex";

export const SeparatorUi = ({ category, index }) => {
  const { menu } = useContext(FirebaseContext);
  const [state, setState] = useState(true);

  useEffect(() => {
    separador();
  }, []);

  const separador = () => {
    if (index > 0) {
      const categoryAntes = menu[index - 1].category;

      if (categoryAntes !== category) {
        setState(true);
      } else {
        setState(false);
      }
    }
  };

  return (
    <Fragment>
      {state ? (
        <List.Subheader
          style={{
            textAlign: "center",
            backgroundColor: "#000",
          }}
        >
          <Text
            style={{
              color: "#FFDA00",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {category}
          </Text>
        </List.Subheader>
      ) : null}
    </Fragment>
  );
};
