import React from "react";
import { db } from "../App";
import * as firebase from "firebase";
import "../styles/Admin.css";
import User from "./User";
import Button from "./Button";
import { truncate } from "fs";
export interface AdminProps {}

const Admin: React.SFC<AdminProps> = () => {
  const [users, setUsers] = React.useState<firebase.firestore.DocumentData[]>();
  const [userName, setuserName] = React.useState("");
  const [userPhoto, setuserPhoto] = React.useState("");
  const [userCompany, setuserCompany] = React.useState("");
  const [loadingSpinner, setloadingSpinner] = React.useState(true);
  const userLogged = firebase.auth().currentUser!.email;
  const [userShow, setuserShow] = React.useState<
    firebase.firestore.DocumentData
  >({});
  const [userSearch, setuserSearch] = React.useState("");
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
      setuserShow(user)
      if(Object.keys(userShow).length !==0) console.log('Sip')
    }
  };

  const searchUser = () => {
    let user: firebase.firestore.DocumentData = {};
    users!.map((us) => {
      if (us.userName.toLowerCase().includes(userSearch.toLowerCase())) {
        user= us;
      }
    });
    if(Object.keys(user).length !== 0){
      return user
    }
    return {}
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
          <div className="admin-header-card">
            <img
              src="https://image.flaticon.com/icons/png/512/2905/2905103.png"
              alt="..."
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
          <div className="users-wrapper">
            <div className="wrapper-title">
              <h4>Usuarios</h4>
              <small>Una lista de personas que usan la app</small>
            </div>
            {users?.map((user) => {
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
          </div>
        </div>
        <div className="col-sm-12 col-md-4 mt-3">
          <div className="queue-card">
            <div className="queue-card-title">
              <h4 className="mb-0">Cola de trámites</h4>
              <small className="mt-0">Simplificación de tramites</small>
            </div>
            <div className="dequeue-button" style={{ width: 140 }}>
              <Button name="Desencolar" action={() => {}} />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-12 col-md-5 mt-3">
          <div className="user-card mb-4" style={{ padding: "1rem" }}>
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
            { Object.keys(userShow).length !== 0 ? (
              <User
                user={userShow.user}
                userDescription={userShow.userDescription}
                userName={userShow.userName}
                userPhoto={userShow.userPhoto}
              />
            ) : (
              <p className="font-weight-bold" style={{ color: "#ff5e62" }}>
                No se ha encontrado el usuario
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
