import React, { useState } from "react";
import { db } from "../App";
import * as firebase from "firebase";
import "../styles/Admin.css";
import User, { UserProps } from "./User";
import Button from "./Button";
import { truncate } from "fs";
import { Queue } from "../classes/Queue";
import UserSection from "./UserSection";
import { HashTable } from "../classes/HashTable";
export interface AdminProps {}

export interface Question {
  question: String;
  timestamp: String;
  user: String;
}

const Admin: React.SFC<AdminProps> = () => {
  const [users, setUsers] = React.useState<firebase.firestore.DocumentData[]>(
    []
  );
  const [userName, setuserName] = React.useState("");
  const [userPhoto, setuserPhoto] = React.useState("");
  const [userCompany, setuserCompany] = React.useState("");
  const [loadingSpinner, setloadingSpinner] = React.useState(true);
  const userLogged = firebase.auth().currentUser!.email;
  const [userShow, setuserShow] = React.useState<
    firebase.firestore.DocumentData
  >({});
  const [userSearch, setuserSearch] = React.useState("");

  const [questions, setquestions] = React.useState<
    firebase.firestore.DocumentData[]
  >([]);
  const [queue, setqueue] = React.useState(new Queue<UserProps & Question>());
  const [count, setcount] = React.useState(1);

  const myHashTable = new HashTable(5);

  React.useEffect(() => {
    const fetchData = async () => {
      db.collection("users").onSnapshot((user) => {
        const data = user.docs.map((doc) => doc.data());
        for (let i = 0; i < data.length; i += 1) {
          Object.defineProperty(data[i], "id", {
            value: user.docs[i].id,
          });
        }
        setUsers(data);
      });
      db.collection("questions")
        .orderBy("timestamp", "asc")
        .onSnapshot((question) => {
          const data = question.docs.map((doc) => doc.data());
          for (let i = 0; i < data.length; i += 1) {
            Object.defineProperty(data[i], "id", {
              value: question.docs[i].id,
            });
          }
          setquestions(data);
        });
    };
    fetchData();
  }, []);

  const getUserInfo = () => {
    db.collection("users_admin")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().user === userLogged) {
            setuserName(doc.data().userName);
            setuserPhoto(doc.data().companyPhoto);
            setuserCompany(doc.data().company);
          }
        });
      });
  };
  getUserInfo();

  const wait = () => {
    setTimeout(() => {
      setloadingSpinner(false);
    }, 2000);
  };

  const handleEnterUser = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const user = searchUser();
      setuserShow(user);
      //if (Object.keys(userShow).length !== 0) console.log("Sip");
    }
  };

  const searchUser = () => {
    const searchPosition = myHashTable.getPolyHash(
      userSearch,
      myHashTable.length
    );
    if (myHashTable.myHashTable[searchPosition] === undefined) {
      return {};
    } else {
      console.log(myHashTable.myHashTable[searchPosition]);
      return myHashTable.myHashTable[searchPosition].searchUser(userSearch)?.data;
    }
  };

  const getQuestions = () => {
    if (count === 1) {
      questions.map((question) => {
        users.map((user) => {
          if (question.user === user.id) {
            const data = {
              user: user.user,
              userDescription: user.userDescription,
              userName: user.userName,
              userPhoto: user.userPhoto,
              idquestion: question.id,
              question: question.question,
              timestamp: question.timestamp,
            };
            queue.enqueue(data);
            let newQueue = new Queue<UserProps & Question>(
              queue.queue,
              queue.length
            );
            setqueue(newQueue);
            setcount(10);
          }
        });
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-sm-12 col-md-3">
          <div className="welcome-admin-card mt-0 mb-3">
            <h4 className="mb-0 mt-0">Te damos la bienvenida</h4>
            <p className="mb-0"> Este es tu panel de administracion</p>
          </div>
        </div>
        <div className="col-lg-2  col-md-2 d-sm-none d-md-block">
          <div
            className="admin-header-card"
            onClick={() => {
              getQuestions();
            }}
          >
            <img
              src="https://image.flaticon.com/icons/png/512/2905/2905103.png"
              alt="Obtener preguntas"
              width="52px"
            />
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="welcome-admin-card">
            <div className="media">
              <img
                src={userPhoto}
                className="mr-3"
                alt="userPhoto"
                style={{ width: "10%" }}
              />
              <div className="media-body">
                <div className="row">
                  <div className="col-10">
                    <h5 className="mt-0 mb-0">{userCompany}</h5>
                    <p className="mb-0">
                      <span>Administrador: </span>
                      <span className="font-weight-light"> {userName}</span>
                    </p>
                  </div>
                  <div className="col-2 ">
                    {loadingSpinner ? (
                      <div
                        className="spinner-border text-primary"
                        role="status"
                        style={{ marginTop: 6 }}
                      ></div>
                    ) : (
                      <> </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-sm-12 col-md-5 mt-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="users-wrapper ">
                  <div className="wrapper-title mb-2">
                    <h4>Usuarios</h4>
                    <small>Una lista de personas que usan la app</small>
                  </div>
                  {users?.map((user) => {
                    let myUser: UserProps = {
                      user: user.user,
                      userDescription: user.userDescription,
                      userName: user.userName,
                      userPhoto: user.userPhoto,
                    };
                    myHashTable.add(myUser);
                    return (
                      <User
                        user={user.user}
                        userDescription={user.userDescription}
                        userName={user.userName}
                        userPhoto={user.userPhoto}
                        key={user.id}
                      />
                    );
                  })}
                  {wait()}
                  {console.log(myHashTable.myHashTable)}
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <div className="user-card mb-4">
                  <h5>Buscar un usuario:</h5>
                  <input
                    type="text"
                    className="form-control"
                    id="search-user"
                    placeholder="Escribe un correo de usuario"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      setuserSearch(e.target.value);
                    }}
                    onKeyPress={(e) => handleEnterUser(e)}
                  />
                  <small>Presiona enter ➡ para buscar un usuario</small>
                  {Object.keys(userShow).length !== 0 ? (
                    <User
                      user={userShow.user}
                      userDescription={userShow.userDescription}
                      userName={userShow.userName}
                      userPhoto={userShow.userPhoto}
                    />
                  ) : (
                    <p
                      className="font-weight-bold"
                      style={{ color: "#ff5e62" }}
                    >
                      No se ha encontrado el usuario
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-sm-12 col-md-5 mt-3 mb-3">
          <div className="queue-card">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-7">
                  <div className="queue-card-title">
                    <h4 className="mb-0">Cola de preguntas</h4>
                    <small className="mt-0">
                      Resuelve las dudas de tus usuarios
                    </small>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-12">
                  <div className="dequeue-button" style={{ marginRight: 10 }}>
                    <Button
                      name="Desencolar"
                      action={() => {
                        if (queue.length > 0) {
                          const question = queue.dequeue();
                          const newQueue = new Queue<UserProps & Question>(
                            queue.queue,
                            queue.length
                          );
                          db.collection("questions")
                            .doc(question.idquestion)
                            .delete();

                          setqueue(newQueue);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  {queue.queue.toArray().map((question, index) => {
                    return (
                      <div className="card mt-3" key={index}>
                        <div className="media card-header">
                          <img
                            src={question.userPhoto}
                            className="mr-3"
                            alt="..."
                            style={{ width: 30 }}
                          />
                          <div className="media-body">
                            <h5 className="mt-0">{question.userName}</h5>
                          </div>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">Te hizo una pregunta</h5>
                          <p className="card-text mb-1">{question.question}</p>
                          <div className="mt-2 mb-2">
                            <textarea
                              className="card-response"
                              style={{ width: "100%" }}
                            ></textarea>
                          </div>

                          <small className="mt-0">
                            {question.timestamp.toDate().toString()}
                          </small>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
