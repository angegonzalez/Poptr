import React from "react";
import New, { NewProps } from "./New";
import "../styles/NewsSection.css";
import { db } from "../App";
import * as firebase from "firebase";
import $ from "jquery";
import Modal from "react-bootstrap/Modal";
import UserSection from "./UserSection";
import Toast from "react-bootstrap/Toast";
import { AVLTree } from "../classes/AVLTree";
import { Stack } from "../classes/Stack";
import notificationsStack from "../classes/Tasks";
import Button from "./Button";
import Task from "./Task";
import Notifications from "./Notifications";

interface hashTagData {
  hashTag: string;
  count: number;
}

interface NewsSectionProps {
  updatedUserInfo: boolean;
  //notifications: Stack<JSX.Element>;
}

const NewsSection: React.SFC<NewsSectionProps> = (props) => {
  const [news, setNews] = React.useState<firebase.firestore.DocumentData[]>([]);
  const [userLoggedIn, setUserLoggedIn] = React.useState("");
  const [userPhoto, setUserPhoto] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [createdNew, setCreatedNew] = React.useState("");
  const [showToastNew, setshowToastNew] = React.useState(false);
  const [showUpdatedInfoToast, setshowUpdatedInfoToast] = React.useState(
    props.updatedUserInfo
  );
  const [test, settest] = React.useState(0);
  const [testFlag, settestFlag] = React.useState(false);

  let notifications = new Stack<JSX.Element>();

  let hashTags: any = {};

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  let tree = new AVLTree<hashTagData>();

  let userDescription = "";
  let unsuscribe: () => void;

  React.useEffect(() => {
    const fetchData = async () => {
      unsuscribe = db
        .collection("news")
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

    return () => {
      unsuscribe();
    };
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
        likes: 0,
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
      setshowToastNew(true);
    } else alert("No se ha cargado el usuario");
  };

  const getHashtags = () => {
    news.map((notice) => {
      const charArray: [] = notice.newDescription.split(" ");
      for (let i = 0; i < charArray.length; i += 1) {
        let ht = charArray[i];
        if (/^#/.test(ht)) {
          if (hashTags[ht] === undefined) {
            hashTags[ht] = 1;
          } else {
            hashTags[ht] += 1;
          }
        }
      }
    });
  };

  const getTopTrending = () => {
    getHashtags();
    for (const hashtag in hashTags) {
      const data: hashTagData = {
        hashTag: hashtag,
        count: hashTags[hashtag],
      };
      tree.add(data);
    }
  };

  getTopTrending();

  /*const notificationsLogic = () => {
    notifications.pop();
    setnotifications(notifications);
  };*/

  /*
  const doRender = () => {
    if (notifications.isEmpty()) {
      settestFlag(true);
    } else {
      settest(test + 1);
      notificationsLogic();
    }
  };
  */

  const getNotifications = () => {
    const task = (
      <Task
        key={4}
        name="Interactua"
        description="Publica sobre algun trámite que requieras"
        delay={2000}
      ></Task>
    );
    const task2 = (
      <Task
        key={1}
        name="Ayuda a otros usuarios"
        description="Comenta en alguna publicación con información relevante"
        delay={3500}
      ></Task>
    );
    const task3 = (
      <Task
        key={2}
        name="Explora la app"
        description="Tenemos grandes funcionalidades para ti"
        delay={2500}
      ></Task>
    );
    const task4 = (
      <Task
        key={3}
        name="Explora trámites"
        description="Tenemos grandes funcionalidades para ti"
        delay={3000}
      ></Task>
    );

    notifications.push(task2);
    notifications.push(task4);
    notifications.push(task3);
    notifications.push(task);

    if (showUpdatedInfoToast) {
      notifications.push(
        <Task
          key={5}
          delay={1000}
          description={"Has actualizado la información correctamente 🙋🏼‍♂️👌🏼"}
          name={"Poptr"}
        ></Task>
      );
    }
    if (showToastNew) {
      notifications.push(
        <Task
          key={6}
          description={
            "Has hecho una publicación 🔥🔥 , revisa la sección de publicaciones"
          }
          name={"Poptr"}
        ></Task>
      );
    }
  };
  return (
    <>
      <div
        className="row mb-3 mr-2 ml-2 mt-4
      "
      >
        <div className="col-1"></div>
        <div className="col-md-8 col-sm-12 col-lg-8 col-xl-5">
          <div className="container news_section mb-3">
            <h2 className=" mt-2 mb-2" style={{ textAlign: "center" }}>
              Publicaciones
              <span className="badge badge-dark ml-2"> {news.length}</span>
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
                    likes={el.likes}
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

        <div className="notifications d-none d-xl-block">
          {getNotifications()}
          <Notifications notificationsStack={notifications}></Notifications>
        </div>
        <div className="d-none d-xl-block">
          <div
            className="trending-card-lg mb-4"
            style={{ padding: "1rem", color: "white" }}
          >
            <h5>Trending 🔥</h5>
            <div className="trending-card-body">
              {tree.getTop2().map((hashtag, index) => {
                return (
                  <div className="trending-item" key={index}>
                    <code className="mt-0">{hashtag}</code>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-xs-12 d-none d-sm-block d-md-none">
          <div
            className="trending-card mb-4"
            style={{ padding: "1rem", color: "white" }}
          >
            <h5>Trending 🔥</h5>
            <div className="trending-card-body">
              {tree.getTop2().map((hashtag, index) => {
                return (
                  <div className="trending-item" key={index}>
                    <code className="mt-0">{hashtag}</code>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsSection;
