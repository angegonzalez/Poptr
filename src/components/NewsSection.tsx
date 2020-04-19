import React from "react";
import New, { NewProps } from "./New";
import "../styles/NewsSection.css";
import { db } from "../App";
import * as firebase from "firebase";
import $ from "jquery";
import Modal from "react-bootstrap/Modal";
import UserSection from "./UserSection";

const NewsSection: React.SFC = () => {
  const [news, setNews] = React.useState<firebase.firestore.DocumentData[]>([]);
  const [userLoggedIn, setUserLoggedIn] = React.useState("");
  const [userPhoto, setUserPhoto] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [createdNew, setCreatedNew] = React.useState("");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  let userDescription = "";
  React.useEffect(() => {
    const fetchData = async () => {
      db.collection("news")
        .orderBy("timestamp", "desc")
        .onSnapshot((doc) => {
          const data = doc.docs.map((doc) => doc.data());
          for (let i = 0; i < data.length; i += 1) {
            Object.defineProperty(data[i], "id", {
              value: doc.docs[i].id,
            });
          }
          setNews(data);
        });
    };
    fetchData();
  }, []);
  const getUser = () => {
    const loggedUser = firebase.auth().currentUser!.email;
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.user === loggedUser) {
            setUserLoggedIn(data.userName);
            setUserPhoto(data.userPhoto);
            userDescription = data.userDescription;
          }
        });
      });
  };
  getUser();

  const handleCreateNew = () => {
    handleShowModal();
    document.getElementById("create-new-input")?.blur();
  };

  const sendCreatedNew = () => {
    if (userDescription !== "") {
      let data = {
        comments: [],
        newDescription: createdNew,
        userDescription: userDescription,
        userName: userLoggedIn,
        userPhoto: userPhoto,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      firebase
        .firestore()
        .collection("news")
        .doc()
        .set(data)
        .then(() => {
          console.log("Data recorded in Database");
        });
    } else alert("No se ha cargado el usuario");
  };

  return (
    <>
      <div
        className="row mb-3 mr-2 ml-2 mt-4
      "
      >
        <div className="col-lg-3">
          <UserSection></UserSection>
        </div>
        <div className="col-md-8 col-sm-10 col-lg-6">
          <div className="container-fluid news_section mb-3">
            <h2 className=" mt-2 mb-2" style={{ textAlign: "center" }}>
              Publicaciones
            </h2>
            <div className="create-new mt-4 mb-4 ml-3 mr-3">
              <div className="media">
                <img
                  src={userPhoto}
                  className="mr-3"
                  alt="..."
                  width="40"
                  height="40"
                />
                <div className="media-body">
                  <input
                    type="text"
                    className="form-control"
                    id="create-new-input"
                    placeholder="¿Necesitas ayuda en algún trámite?"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onClick={() => {
                      handleCreateNew();
                    }}
                  />
                </div>
              </div>
              <Modal
                show={showModal}
                onHide={handleCloseModal}
                animation={false}
                centered
              >
                <Modal.Header closeButton style={{ alignItems: "center" }}>
                  <Modal.Title>Crear Publicación </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="media">
                    <img
                      src={userPhoto}
                      className="mr-3"
                      alt="..."
                      width="40"
                      height="40"
                    />
                    <div className="media-body">
                      <h4>{userLoggedIn}</h4>
                    </div>
                  </div>
                  <div className="body-content mt-4">
                    <textarea
                      className="new-txtarea"
                      placeholder={"Pregunta algo acerca de un trámite"}
                      onChange={(e) => setCreatedNew(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          sendCreatedNew();
                          handleCloseModal();
                        }
                      }}
                    ></textarea>
                  </div>
                  <small>Pulsa enter para publicar 🆙</small>
                </Modal.Body>
                <Modal.Footer>
                  <small>
                    Consejo: Intenta preguntar lo mas claro posible para que
                    todos te entiendan 🏆
                  </small>
                </Modal.Footer>
              </Modal>
            </div>
            {news.length !== 0 ? (
              news.map((el) => {
                return (
                  <New
                    key={el.id}
                    id={el.id}
                    userNameLoggedIn={userLoggedIn}
                    userNameNew={el.userName}
                    userDescription={el.userDescription}
                    newDescription={el.newDescription}
                    userPhotoLoggedIn={userPhoto}
                    userPhotoNew={el.userPhoto}
                    comments={el.comments}
                  ></New>
                );
              })
            ) : (
              <></>
            )}
            <footer>
              <small>Desarrollado con ♥ por: Angel Mateo Gonzalez ✈</small>
            </footer>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="trending-card mb-4" style={{ padding: "1rem", color: "white" }}>
              <h5 className="mb-5" >
                Trending 🔥
              </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsSection;
