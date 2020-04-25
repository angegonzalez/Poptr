import React from "react";
import { db } from "../App";
import User, { UserProps } from "./User";
import firebase from "firebase";
import { cleanup } from "@testing-library/react";

export interface ProfileProps {}

const Profile: React.SFC<ProfileProps> = () => {
  const [userSearch, setuserSearch] = React.useState("");
  const [userShow, setuserShow] = React.useState<
    firebase.firestore.DocumentData
  >({});
  const [userFlag, setuserFlag] = React.useState(false);
  const [users, setUsers] = React.useState<firebase.firestore.DocumentData[]>();
  let userSignedInInfo: firebase.firestore.DocumentData = {};
  const loggedUser = firebase.auth().currentUser!.email;

  //Update states
  const [userNameUpdate, setuserNameUpdate] = React.useState("");
  const [userDescriptionUpdate, setuserDescriptionUpdate] = React.useState("");
  const [userPhotoUpdate, setuserPhotoUpdate] = React.useState("");

  React.useEffect(()  => {
    const fetchData = async () => {
      db.collection("users").get().then((user) => {
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

  const searchUser = () => {
    users!.map((us) => {
      if (us.user === userSearch) {
        setuserShow(us);
      }
    });
    if (userShow !== null) {
      setuserFlag(true);
    }
  };

  const handleEnterUser = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchUser();
    }
  };

  const getUserInfo = () => {
    users!.map((us) => {
      if (us.user === loggedUser) {
        userSignedInInfo = us;
      }
    });
  };
  const updateUser = () => {
    let userRef = db.collection("users").doc(userSignedInInfo.id);
    let updatedUser: any = {}
    if(userNameUpdate !== "")  updatedUser.userName = userNameUpdate
    else updatedUser.userName= userSignedInInfo.userName
    if(userDescriptionUpdate !== "")  updatedUser.userDescription = userDescriptionUpdate
    else updatedUser.userDescription= userSignedInInfo.userDescription
    if(userPhotoUpdate !== "")  updatedUser.userPhoto = userPhotoUpdate
    else updatedUser.userPhoto= userSignedInInfo.userPhoto

    userRef.update(updatedUser)
    .then(() => console.log("Actualizado con exito"))
    .catch(() => console.log("Ocurrio un error al actualizar"));
  };

  return (
    <>
      <div className="row mb-3 mr-2 ml-2 mt-4">
        <div className="col-4">
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
            {userFlag ? (
              <User
                user={userShow.user}
                userDescription={userShow.userDescription}
                userName={userShow.userName}
                userPhoto={userShow.userPhoto}
              />
            ) : (
              <p className="font-weight-bold">No se ha encontrado el usuario</p>
            )}
          </div>
        </div>
        {users ? getUserInfo() : console.log(users)}
        <div className="col-4">
          <div className="user-card mb-4" style={{ padding: "1rem" }}>
            <h5>Perfil</h5>
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">Usuario</label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    defaultValue={userSignedInInfo.user || ""}
                    disabled={true}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail5">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    defaultValue={userSignedInInfo.userName || ""}
                    onChange={(e) => setuserNameUpdate(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="descriptionTextArea">Descripcion</label>
                <textarea
                  className="form-control"
                  id="descriptionTextArea"
                  defaultValue={userSignedInInfo.userDescription || ""}
                  onChange={(e) => setuserDescriptionUpdate(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="inputUserPhoto">URL de la foto</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputUserPhoto"
                  defaultValue={userSignedInInfo.userPhoto || ""}
                  onChange={(e) => setuserPhotoUpdate(e.target.value)}
                />
              </div>
              <div className="form-group row">
                <div className="col-sm-10">
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={updateUser}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
