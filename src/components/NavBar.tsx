import React from "react";
import logo from "../resources/seo-and-web.svg";
import "../styles/NavBar.css";
import {
  BrowserRouter as Router,
  withRouter,
  NavLink,
  RouteComponentProps,
} from "react-router-dom";

const NavBar: React.SFC<RouteComponentProps> = (props) => {
  return (
    <div className="nav-bar">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand font-weight-bold" href="/">
          <img
            src="https://image.flaticon.com/icons/svg/2706/2706754.svg"
            width="35"
            height="35"
            className="d-inline-block align-top mr-2"
            alt=""
          />
          Poptr
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <NavLink
                to="/app"
                className="nav-link"
                activeClassName="nav-item active"
              >
                Inicio<span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/profile"
                className="nav-link"
                activeClassName="nav-item"
              >
                Perfil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/transactions"
                className="nav-link"
                activeClassName="nav-item"
              >
                Tus trámites<span className="sr-only">(current)</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(NavBar);
