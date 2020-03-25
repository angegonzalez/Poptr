import React from "react";
import "../styles/Landing.css";
import landing from "../resources/landing.svg";
import CardInfo from "./CardInfo";

const Landing: React.SFC = () => {
  const [cardsVisibility, setCards] = React.useState(false);

  return (
    <>
      <div className="container-fluid login">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-lg-3 col-sm-10">
            <div className="login-card-bg">
              <div className="login-card">
                <h2 className="font-weight-bold">Iniciar sesión</h2>
                <br></br>
                <form>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Tu correo electrónico 📧"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Tu contraseña 🔑"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-sm-12 col-md-12 col-md-12 col-lg-6">
                      <button type="submit" className="btn btn-dark btn-block">
                        Iniciar ➡
                      </button>
                    </div>
                    <div className="form-group col-sm-12 col-md-12 col-md-12 col-lg-6">
                      <button
                        type="submit"
                        disabled={true}
                        className="btn btn-outline-dark btn-block"
                      >
                        Registro 📄
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-2"></div>
          <div className="col-lg-5">
            <img
              className={"img-landing"}
              src={landing}
              onMouseEnter={() => {
                setCards(true);
              }}
              onMouseOut= { ()=> {
                setCards(false);
              }}
            ></img>

            {cardsVisibility ? (
              <div className="cards-information">
                <CardInfo
                  title={"Ejemplo"}
                  description={"nose"}
                  color={"#e29e67"}
                  img={landing}
                />
              </div>
            ) : (
              <div className="img-caption">
                <h5 className={"font-weight-light"}>
                  Pasa el cursor sobre la imagen para saber más
                </h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
