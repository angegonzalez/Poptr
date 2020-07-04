import React from "react";
import NavBar from "./components/NavBar";
import NewsSection from "./components/NewsSection";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Landing from "./components/Landing";
import TransactionSection from "./components/TransactionsSection";
import Profile from "./components/Profile";
import Admin from "./components/Admin";

const firebaseConfig = {
  apiKey: "AIzaSyBUKo-7_RNCanGw1_EtGc8bejX5Hk2-Gag",
  authDomain: "angapp-6e8f8.firebaseapp.com",
  databaseURL: "https://angapp-6e8f8.firebaseio.com",
  projectId: "angapp-6e8f8",
  storageBucket: "angapp-6e8f8.appspot.com",
  messagingSenderId: "626239018121",
  appId: "1:626239018121:web:4299c3f1875e764e21e258",
};
firebase.initializeApp(firebaseConfig);



function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isAdminLoggedIn, setAdminLoggedIn] = React.useState(false);
  const [updatedUserInfo, setupdatedUserInfo] = React.useState(false);
  
  return (
    <>
      <Router>
        <NavBar />
        <>
          <Switch>
            {isLoggedIn && !isAdminLoggedIn ? (
              <Redirect exact={true} path="/app" to="/home"></Redirect>
            ) : null}
            {isAdminLoggedIn && !isLoggedIn ? (
              <Redirect exact={true} path="/app" to="/admin"></Redirect>
            ) : null}
            <Redirect exact={true} path="/" to="/app" />
            <Route
              exact={true}
              path="/app"
              render={(props) => (
                <Landing
                  {...props}
                  setLoggedIn={setLoggedIn}
                  setAdminLoggedIn={setAdminLoggedIn}
                />
              )}
            ></Route>
            <Route exact={true} path="/home">
              {isLoggedIn ? (
                <NewsSection updatedUserInfo ={updatedUserInfo}/>
              ) : (
                <Redirect to="/app" />
              )}
            </Route>
            <Route exact={true} path="/transactions">
              {isLoggedIn ? <TransactionSection /> : <Redirect to="/app" />}
            </Route>
            <Route exact={true} path="/profile">
              {isLoggedIn ? <Profile setupdatedUserInfo={setupdatedUserInfo} /> : <Redirect to="/app" />}
            </Route>

            <Route exact={true} path="/admin">
              {isAdminLoggedIn ? <Admin /> : <Redirect to="/app" />}
            </Route>
          </Switch>
        </>
      </Router>
    </>
  );
}
export const db = firebase.firestore();
export default App;
