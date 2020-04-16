import React from "react";
import logo from "../resources/seo-and-web.svg";
import Commentary from "./Commentary";
import * as firebase from "firebase";
import { db } from "../App";
import { LinkedList } from "../classes/LinkedList";

export interface NewProps {
  id: string;
  userNameLoggedIn: string;
  userNameNew: string;
  userDescription: string;
  newDescription: string;
  userPhotoLoggedIn: string;
  userPhotoNew: string;
  comments: [{ user: string; comment: string; photo: string }];
}

const New: React.SFC<NewProps> = (props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [commentary, setCommentary] = React.useState("");
  const commentsLinkedList = new LinkedList();
  let iteratorCommentsLinkedList = commentsLinkedList.items();


  const onClickComment = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const getCommentsToLinkedList = () => {
    props.comments.forEach((element) => {
      commentsLinkedList.pushBack(element);
    });
  };
  getCommentsToLinkedList();
  console.log(commentsLinkedList)

  const publishCommentary = () => {
    db.collection("news")
      .doc(props.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          comment: commentary,
          user: props.userNameLoggedIn,
          photo: props.userPhotoLoggedIn,
        }),
      });

  };

  const handleInputCommentary = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      publishCommentary();
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };
  const traverseLinkedList = () => {
    getCommentsToLinkedList();
    // while (true) {
    //   let item = iteratorCommentsLinkedList.next();
    //   if (item.done) break;
    //   else {
    //     console.log(item.value.data);
    //   }
    // }
    console.log( commentsLinkedList)
  };

  return (
    <>
      <div className="card" style={{ margin: "1rem" }}>
        <div className="card-body">
          <div className="media mt-1">
            <img
              src={props.userPhotoNew}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt=""
            />
            <div className="media-body">
              <h6 className="ml-2 mb-0">{props.userNameNew}</h6>
              <p className="ml-2 mt-0 font-weight-light">
                {props.userDescription}
              </p>
            </div>
          </div>
          <p style={{ fontSize: "18.5px" }}>{props.newDescription}</p>
          <div className="row" style={{ marginTop: "15px" }}>
            <div className="col-6">
              <button type="button" className="btn btn-dark btn-block">
                Me gusta
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
          {props.comments.map((element, index) => {
            return (
              <Commentary
                key={index}
                userName={element.user}
                userComment={element.comment}
                userPhoto={element.photo}
              ></Commentary>
            );
          })}

          <div className="media">
            <img
              src={props.userPhotoLoggedIn}
              className="mr-2"
              alt="..."
              width="40"
              height="40"
            />
            <div className="media-body">
              <h6 className="mt-0 font-weight-bold">
                {props.userNameLoggedIn}
              </h6>
              <input
                ref={inputRef}
                type="text"
                className="form-control"
                placeholder="Escribe un comentario"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onKeyPress={(e) => handleInputCommentary(e)}
                onChange={(e) => setCommentary(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default New;
