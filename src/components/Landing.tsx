import React from "react";
import "../styles/Landing.css";
import landing from "../resources/landing.svg";
import CardInfo from "./CardInfo";
import footer from "../resources/footer_img.svg";
import * as firebase from "firebase/app";
import ReactCardFlip from "react-card-flip";
import Toast from "react-bootstrap/Toast";
import ToastHeader from "react-bootstrap/Toast";
import ToastBody from "react-bootstrap/Toast";

interface ILanding {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Landing: React.SFC<ILanding> = props => {
  const [cardsVisibility, setCards] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [flipped, setFlipped] = React.useState(false);
  const [ocupation, setOcupation] = React.useState(
    "No has seleccionado tu ocupación"
  );
  const [emailRegister, setEmailRegister] = React.useState("");
  const [passwordRegister, setPasswordRegister] = React.useState("");
  const [place, setPlace] = React.useState("");
  const [ocupationDescription, setOcupationDescription] = React.useState("");
  const [userNameRegister, setUserNameRegister] = React.useState("");
  const [showToast, setShowToast] = React.useState(false);
  const doLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userName, password)
      .then(() => {
        props.setLoggedIn(true);
      })
      .catch(err => {
        alert("Se produjo el siguiente error al intentar iniciar: " + err);
      });
  };

  const doRegister = () => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(emailRegister, passwordRegister)
    let data = {
      user: emailRegister,
      userDescription: ocupation + " " + ocupationDescription + " en " + place,
      userName: userNameRegister,
      userPhoto: "https://image.flaticon.com/icons/svg/1226/1226097.svg"
    };

    firebase
      .firestore()
      .collection("users")
      .add(data)
      .then(() => setShowToast(true));
  };

  return (
    <>
      <div className="container-fluid login">
        <div className="row" style={{ marginTop: "7%", marginBottom: "7%" }}>
          <div className="col-1"></div>
          <div className="col-lg-4 col-sm-10">
            <div className="login-card-bg">
              <div className="login-card">
                <ReactCardFlip isFlipped={flipped}>
                  <>
                    <h2 className="font-weight-bold">Iniciar sesión</h2>
                    <br></br>
                    <form>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Tu correo electrónico 📧"
                          onChange={e => {
                            setUserName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Tu contraseña 🔑"
                          onChange={e => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group col-sm-12 col-md-12 col-md-12 col-lg-6">
                          <button
                            type="button"
                            className="btn btn-dark btn-block"
                            onClick={doLogin}
                          >
                            Iniciar ➡
                          </button>
                        </div>
                        <div className="form-group col-sm-12 col-md-12 col-md-12 col-lg-6">
                          <button
                            type="button"
                            onClick={() => setFlipped(true)}
                            className="btn btn-outline-dark btn-block"
                          >
                            Registro 📄
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                  <>
                    <h2 className="font-weight-bold">¡Unete ahora!</h2>
                    <br></br>
                    <form>
                      <div className="form-group">
                        <label htmlFor="txtUserEmail">
                          Tu direccion de correo electrónico 📧
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="txtUserEmail"
                          placeholder="Tu correo electrónico 📧"
                          onChange={e => setEmailRegister(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="txtUserPassword">Tu contraseña 🗝</label>

                        <input
                          type="password"
                          className="form-control"
                          id="txtUserPassword"
                          placeholder="Tu contraseña 🔑"
                          onChange={e => setPasswordRegister(e.target.value)}
                        />
                        <small>Nunca se la digas a nadie 🤫</small>
                      </div>

                      <div className="form-group ">
                        <label htmlFor="txtUserName">Tu nombre 👋</label>
                        <input
                          type="text"
                          className="form-control"
                          id="txtUserName"
                          onChange={e => setUserNameRegister(e.target.value)}
                        />
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="Estudia"
                          onChange={() => setOcupation("Estudio")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio1"
                        >
                          ¿Estudias?
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="Trabaja"
                          onChange={() => setOcupation("Trabajo como")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2"
                        >
                          ¿Trabajas?
                        </label>
                      </div>

                      <div className="form-group mt-1">
                        <label htmlFor="txtUserPlace">¿En donde? 🤔</label>
                        <input
                          type="text"
                          className="form-control"
                          id="txtUserPlace"
                          onChange={e => setPlace(e.target.value)}
                        />
                      </div>

                      <div className="form-group mt-1">
                        <label htmlFor="txtUserPosition">{ocupation} 😎</label>
                        <input
                          type="text"
                          className="form-control"
                          id="txtUserPosition"
                          onChange={e =>
                            setOcupationDescription(e.target.value)
                          }
                        />
                      </div>

                      <div className="form-row mt-4">
                        <div className="form-group col-sm-12 col-md-12 col-md-12 col-lg-6">
                          <button
                            type="submit"
                            className="btn btn-dark btn-block"
                          >
                            Volver ⬅
                          </button>
                        </div>
                        <div className="form-group col-sm-12 col-md-12 col-md-12 col-lg-6">
                          <button
                            type="button"
                            className="btn btn-outline-dark btn-block"
                            onClick={doRegister}
                          >
                            Registro 📄
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                </ReactCardFlip>
              </div>
            </div>
          </div>
          <div className="col-lg-3" />

          <div className=" col-lg-3 col-sm-10">
            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={5000}
              autohide
              style={{ marginTop: 20, marginLeft: 10 }}
            >
              <Toast.Header>
                <strong className="mr-auto">Poptr</strong>
                <small>just now</small>
              </Toast.Header>
              <Toast.Body>
                Tu registro se ha completado: pulsa en volver e inicia sesión 🚀
              </Toast.Body>
            </Toast>
          </div>
        </div>
      </div>
      <div className={"fixed-bottom d-none d-xl-block"}>
        <img src={footer} className={"footer-img"}></img>
      </div>
    </>
  );
};

export default Landing;
