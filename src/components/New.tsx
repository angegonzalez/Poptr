import React from "react";
import logo from "../resources/seo-and-web.svg";
import Commentary from "./Commentary";
export interface NewProps {
  userName: string;
  userDescription: string;
  newDescription: string;
  comments: [{ user: string; comment: string }];
}

const New: React.SFC<NewProps> = props => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const onClickComment= () => {
    if(inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }
  return (
    <>
      <div className="card" style={{ margin: "1rem" }}>
        <div className="card-header">
          <div className="media">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt=""
            />
            <div className="media-body">
              <h6 className="ml-2">{props.userName}</h6>
              <p className="ml-2">
                {props.userDescription}
              </p>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p>{props.newDescription}</p>
          <div className="row" style={{ marginTop: "15px" }}>
            <div className="col-6">
              <button type="button" className="btn btn-outline-dark btn-block">
                Me gusta 👍
              </button>
            </div>
            <div className="col-6">
              <button
                type="button"
                className="btn btn-outline-secondary btn-block"
                onClick={onClickComment}
              >
                Comentar
              </button>
            </div>
          </div>
          <p></p>
          <h4>
            <span className="badge badge-dark" style={{ padding: "7px" }}>
              10 👍
            </span>
          </h4>
          <p></p>
          {props.comments.map(element => {
            return (
              <Commentary
                userName={element.user}
                userComment={element.comment}
              ></Commentary>
            );
          })}

          <div className="media">
            <img src="..." className="mr-3" alt="..." />
            <div className="media-body">
              <h6 className="mt-0">{props.userName}</h6>
              <input
                ref={inputRef}
                type="text"
                className="form-control"
                placeholder="Escribe un comentario"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default New;
