import React from "react";
import New, { NewProps } from "./New";
import "../styles/NewsSection.css";
import { db } from "../App";
import * as firebase from "firebase";
import $ from "jquery";
import Modal from "react-bootstrap/Modal";

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
    console.log("render");
    const fetchData = async () => {
      db.collection("news").onSnapshot(doc => {
        const data = doc.docs.map(doc => doc.data());
        for (let i = 0; i < data.length; i += 1) {
          Object.defineProperty(data[i], "id", {
            value: doc.docs[i].id
          });
        }
        setNews(data);
      });
    };
    fetchData();
  }, []);

  const getUser = () => {
    const loggedUser = firebase.auth().currentUser?.email;
    firebase
      .database()
      .ref("/users")
      .once("value")
      .then(snapshot => {
        let array: [
          {
            user: string;
            userDescription: string;
            userName: string;
            userPhoto: string;
          }
        ] = snapshot.val() || [];
        array.map(el => {
          if (el.user === loggedUser) {
            setUserLoggedIn(el.userName);
            setUserPhoto(el.userPhoto);
            userDescription = el.userDescription;
          }
        });
      });
  };
  const handleCreateNew = () => {
    handleShowModal();
    document.getElementById("create-new-input")?.blur();
  };

  const sendCreatedNew = () => {
    let data = {
      comments: [],
      newDescription: createdNew,
      userDescription: userDescription,
      userName: userLoggedIn,
      userPhoto: userPhoto
    };
    firebase
      .firestore()
      .collection("news")
      .doc()
      .set(data)
      .then(() => {
        console.log("Data recorded in Database");
      });
  };

  $(".body-content")
    .on("change keyup keydown paste cut", "textarea", function() {
      $(this)
        .height(0)
        .height(this.scrollHeight);
    })
    .find("textarea")
    .change();

  getUser();
  return (
    <>
      <div className="row mb-3">
        <div className="col-1"></div>
        <div className="col-md-6 col-sm-10">
          <div className="container-fluid news_section">
            <h3 className="text-weight-bold">Publicaciones</h3>
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
                      rows={1}
                      className="new-txtarea"
                      aria-label="With textarea"
                      placeholder={"Pregunta algo acerca de un trámite"}
                      onChange={e => setCreatedNew(e.target.value)}
                      onKeyPress={e => {
                        if (e.key === "Enter"){
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
                    Consejo: Intenta preguntar lo mas claro posible para que todos te
                    entiendan 🏆
                  </small>
                </Modal.Footer>
              </Modal>
            </div>
            {news.length !== 0
              ? news.map(el => {
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
              : console.log("Vacio")}
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
