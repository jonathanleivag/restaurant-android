import app from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "./config";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.db = app.firestore();
  }
}

export const firebase = new Firebase();
