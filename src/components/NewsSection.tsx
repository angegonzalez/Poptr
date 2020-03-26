import React from "react";
import New, { NewProps } from "./New";
import "../styles/NewsSection.css";
import { db } from "../App";
import * as firebase from "firebase";
import { isElement } from "react-dom/test-utils";

const NewsSection: React.SFC = () => {
  const [news, setNews] = React.useState<firebase.firestore.DocumentData[]>();
  const [userLoggedIn, setUserLoggedIn] = React.useState("");
  const [userPhoto, setUserPhoto] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      db.collection("news").onSnapshot(doc => {
        const data = doc.docs.map(doc => doc.data());

        for (let i = 0; i < data.length; i += 1) {
          Object.defineProperty(data[i], "id", {
            value: doc.docs[i].id
          });
        }
        console.log(data);
        setNews(data);
      });
    };
    fetchData();
  }, []);

  const getUser = () => {
    const loggedUser = firebase.auth().currentUser?.email;
    return firebase
      .database()
      .ref("/users")
      .once("value")
      .then(snapshot => {
        let array: [{ user: string; userName: string; userPhoto: string }] =
          snapshot.val() || [];
        array.map(el => {
          if (el.user === loggedUser) {
            setUserLoggedIn(el.userName);
            setUserPhoto(el.userPhoto);
          }
        });
      });
  };
  getUser();

  return (
    <>
      <div className="row mb-3">
        <div className="col-1"></div>
        <div className="col-md-6 col-sm-10">
          <div className="container-fluid news_section">
            <h3 className="text-weight-bold">Publicaciones</h3>
            {news?.map(el => {
              return (
                <New
                  id={el.id}
                  userName={userLoggedIn}
                  userDescription={el.userDescription}
                  newDescription={el.newDescription}
                  userPhoto={userPhoto}
                  comments={el.comments}
                ></New>
              );
            })}
            <footer>
              <small>Desarrollado con ♥ por: Angel Mateo Gonzalez ✈</small>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsSection;
