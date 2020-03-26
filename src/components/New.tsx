import React from "react";
import logo from "../resources/seo-and-web.svg";
import Commentary from "./Commentary";
import * as firebase from "firebase";
import { db } from "../App";

export interface NewProps {
  id: string;
  userName: string;
  userDescription: string;
  newDescription: string;
  userPhoto: string;
  comments: [{ user: string; comment: string; photo: string}];
}

const New: React.SFC<NewProps> = props => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [commentary, setCommentary] = React.useState("");

  const onClickComment = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const publishCommentary = () => {
    db.collection("news")
      .doc(props.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          "comment": commentary,
          "user": props.userName,
          "photo": props.userPhoto
        })
      });
  };

  const handleInputCommentary = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter"){
      publishCommentary();
      if (inputRef && inputRef.current) {
        inputRef.current.value="";
      }

    }
  };

  return (
    <>
      <div className="card" style={{ margin: "1rem" }}>
        <div className="card-header">
          <div className="media mt-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt=""
            />
            <div className="media-body">
              <h6 className="ml-2">Test username</h6>
              <p className="ml-2 mt-0">{props.userDescription}</p>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p>{props.newDescription}</p>
          <div className="row" style={{ marginTop: "15px" }}>
            <div className="col-6">
              <button type="button" className="btn btn-dark btn-block">
                Me gusta 👍
              </button>
            </div>
            <div className="col-6">
              <button
                type="button"
                className="btn btn-outline-dark btn-block"
                onClick={onClickComment}
              >
                Comentar
              </button>
            </div>
          </div>
          <p className="mt-3 mb-4"></p>
          {props.comments.map(element => {
            return (
              <Commentary
                key={element.user}
                userName={element.user}
                userComment={element.comment}
                userPhoto= {element.photo}
              ></Commentary>
            );
          })}

          <div className="media">
            <img
              src={props.userPhoto}
              className="mr-3"
              alt="..."
              width="40"
              height="40"
            />
            <div className="media-body">
              <h6 className="mt-0 font-weight-bold">{props.userName}</h6>
              <input
                ref={inputRef}
                type="text"
                className="form-control"
                placeholder="Escribe un comentario"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onKeyPress={e => handleInputCommentary(e)}
                onChange={e => setCommentary(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default New;
