import React from "react";
import New, { NewProps } from "./New";
import "../styles/NewsSection.css";
import { db } from "../App";
import * as firebase from "firebase";
import $ from "jquery";
import Modal from "react-bootstrap/Modal";
import UserSection from "./UserSection";
import Toast from "react-bootstrap/Toast";

interface hashTagData {
  hashTag: string;
  count: number;
}

interface NewsSectionProps {
  updatedUserInfo: boolean;
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

  let trendingList: string[] = [];
  let hashTagArray: string[] = [];
  let trendingArray: hashTagData[] = [];

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  let userDescription = "";
  let unsuscribe : () => void;

  React.useEffect(() => {
    const fetchData = async () => {
      unsuscribe= db.collection("news")
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
    return () =>{
      unsuscribe()
    }
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

  const getTrending = () => {
    news.map((notice) => {
      const charArray: [] = notice.newDescription.split("");
      charArray.map((word, index) => {
        if (word === "#") {
          let tempIndex = index + 1;
          let hashTag = "#";
          while (charArray[tempIndex] !== " ") {
            if (tempIndex === charArray.length) break;
            else {
              hashTag += charArray[tempIndex];
              tempIndex += 1;
            }
          }
          if (hashTag !== "#") hashTagArray.push(hashTag);
        }
      });
    });
  };

  const getTopTrending = () => {
    getTrending();
    for (let i = 0; i < hashTagArray.length; i += 1) {
      let count = 1;
      for (let j = i + 1; j < hashTagArray.length; j += 1) {
        if (hashTagArray[i] === hashTagArray[j]) {
          count += 1;
          hashTagArray.splice(j, 1);
        }
      }
      let hashTag = {
        hashTag: hashTagArray[i],
        count: count,
      };
      trendingArray.push(hashTag);
    }

    trendingArray.sort((a, b) => {
      if (b.count > a.count) {
        return 1;
      }
      if (b.count < a.count) {
        return -1;
      }
      return 0;
    });

    if (trendingArray.length !== 0) {
      for (let i = 0; i < 3; i += 1) {
        trendingList.push(trendingArray[i].hashTag);
      }
    }
  };
  getTopTrending();
  return (
    <>
      <div
        className="row mb-3 mr-2 ml-2 mt-4
      "
      >
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
        <div className="update-notification d-none d-xl-block">
        <Toast
            onClose={() => setshowUpdatedInfoToast(false)}
            show={showUpdatedInfoToast}
            delay={3000}
            autohide  
          >
            <Toast.Header>
              <strong className="mr-auto">Poptr</strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body>
              Has actualizado la información correctamente 🙋🏼‍♂️👌🏼
            </Toast.Body>
          </Toast>
        </div>
        <div className="new-notification d-none d-xl-block">
          <Toast
            onClose={() => setshowToastNew(false)}
            show={showToastNew}
            delay={4000}
            autohide
          >
            <Toast.Header>
              <strong className="mr-auto">Poptr</strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body>
              Has hecho una publicación 🔥🔥 , revisa la sección de
              publicaciones
            </Toast.Body>
          </Toast>
        </div>
        <div className="d-none d-xl-block">
          <div
            className="trending-card-lg mb-4"
            style={{ padding: "1rem", color: "white" }}
          >
            <h5>Trending 🔥</h5>
            <div className="trending-card-body">
              {trendingList.map((hashtag, index) => {
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
              {trendingList.map((hashtag, index) => {
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
