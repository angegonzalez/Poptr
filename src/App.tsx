import React from "react";
import NavBar from "./components/NavBar";
import NewsSection from "./components/NewsSection";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Landing from "./components/Landing";

const firebaseConfig = {
  apiKey: "AIzaSyBUKo-7_RNCanGw1_EtGc8bejX5Hk2-Gag",
  authDomain: "angapp-6e8f8.firebaseapp.com",
  databaseURL: "https://angapp-6e8f8.firebaseio.com",
  projectId: "angapp-6e8f8",
  storageBucket: "angapp-6e8f8.appspot.com",
  messagingSenderId: "626239018121",
  appId: "1:626239018121:web:4299c3f1875e764e21e258"
};
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <>
        <Switch>
          <Redirect exact={true} path="/" to="/app"/>
          <Route exact={true} path="/app" component={Landing}></Route>
          <Route exact={true} path="/home" component={NewsSection}></Route>
        </Switch>
        </>
      </Router>
    </>
  );
}
export const db = firebase.firestore();
export default App;
