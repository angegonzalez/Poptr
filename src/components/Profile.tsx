import React from "react";
import { db } from "../App";
import User, { UserProps } from "./User";
import firebase from "firebase";
import { cleanup } from "@testing-library/react";
import Button from "./Button";
import "../styles/Profile.css";
import { RouteComponentProps, withRouter, Route } from "react-router-dom";
import { Queue } from "../classes/Queue";
import { Question } from "./Admin";

interface ProfileProps {
  setupdatedUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
}
export const myQueue = new Queue<Question>();

const Profile: React.SFC<RouteComponentProps & ProfileProps> = (props) => {
  const [users, setUsers] = React.useState<firebase.firestore.DocumentData[]>();
  let userSignedInInfo: firebase.firestore.DocumentData = {};
  const loggedUser = firebase.auth().currentUser!.email;

  //Update states
  const [userNameUpdate, setuserNameUpdate] = React.useState("");
  const [userDescriptionUpdate, setuserDescriptionUpdate] = React.useState("");
  const [userPhotoUpdate, setuserPhotoUpdate] = React.useState("");
  const [question, setquestion] = React.useState("");

  React.useEffect(() => {
    props.setupdatedUserInfo(false);
    const fetchData = async () => {
      db.collection("users")
        .get()
        .then((user) => {
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
    users!.map((us) => {
      if (us.user === loggedUser) {
        userSignedInInfo = us;
      }
    });
  };
  const updateUser = () => {
    let userRef = db.collection("users").doc(userSignedInInfo.id);
    let updatedUser: any = {};
    if (userNameUpdate !== "") updatedUser.userName = userNameUpdate;
    else updatedUser.userName = userSignedInInfo.userName;
    if (userDescriptionUpdate !== "")
      updatedUser.userDescription = userDescriptionUpdate;
    else updatedUser.userDescription = userSignedInInfo.userDescription;
    if (userPhotoUpdate !== "") updatedUser.userPhoto = userPhotoUpdate;
    else updatedUser.userPhoto = userSignedInInfo.userPhoto;

    userRef
      .update(updatedUser)
      .then(() => console.log("Usuario actualizado"))
      .catch(() => console.log("Ocurrio un error al actualizar"));

    props.history.push("/home");
    props.setupdatedUserInfo(true);
  };

  return (
    <>
      <div className="row mb-3 mr-2 ml-2 mt-4">
        {users ? getUserInfo() : null}
        <div className="col-xl-4 col-sm-9">
          <div className="user-card mb-4">
            <h3 className="font-weight-bold">Perfil</h3>
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
                <div className="row">
                  <div className="col-2">
                    <img
                      src={userSignedInInfo.userPhoto}
                      alt="..."
                      width="45px"
                    />
                  </div>
                  <div className="col-10">
                    <input
                      type="text"
                      className="form-control mt-1"
                      id="inputUserPhoto"
                      defaultValue={userSignedInInfo.userPhoto || ""}
                      onChange={(e) => setuserPhotoUpdate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="button-submit">
              <Button name="Confirmar" action={updateUser}></Button>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-sm-9">
          <div className="card">
            <div className="card-header">
              <h5>¿Alguna pregunta?</h5>
            </div>
            <div className="card-body">
              <p className="card-text">Asegúrate de preguntar claramente 🙋🏻‍♂️</p>
              <textarea
                className="form-control mt-2 mb-2"
                id="descriptionTextArea"
                onChange={(e) => setquestion(e.target.value)}
              ></textarea>
              <Button
                name={"Preguntar"}
                action={() => {
                  db.collection("questions").add({
                    user: userSignedInInfo.id,
                    question: question,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  });
                }}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Profile);
