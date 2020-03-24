import React from "react";
import logo from "../resources/seo-and-web.svg";
import "../styles/NavBar.css";
import {
  BrowserRouter as Router,
  withRouter,
  NavLink,
  RouteComponentProps
} from "react-router-dom";

interface IProps {
  messageNumber: number;
}

const NavBar: React.SFC<RouteComponentProps> = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <a className="navbar-brand font-weight-bold" href="/">
        <img
          //src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
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
              to="/home"
              className="nav-link"
              activeClassName="nav-item"
            >
              Publicaciones<span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/messages"
              className="nav-link"
              activeClassName="nav-item"
            >
              Mensajes
              <span className="badge badge-light" style={{ marginLeft: "5px" }}>
                1
              </span>
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
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Información
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(NavBar);
