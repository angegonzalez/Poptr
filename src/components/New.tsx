import React from "react";
import logo from "../resources/seo-and-web.svg";
import Commentary from "./Commentary";
import * as firebase from "firebase";
import { db } from "../App";
import { LinkedList } from "../classes/LinkedList";
import Button from "./Button";
import "../styles/New.css";

export interface NewProps {
  id: string;
  userNameLoggedIn: string;
  userNameNew: string;
  userDescription: string;
  newDescription: string;
  userPhotoLoggedIn: string;
  userPhotoNew: string;
  likes: number;
  comments: [{ user: string; comment: string; photo: string }];
}

const New: React.SFC<NewProps> = (props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [commentary, setCommentary] = React.useState("");
  const [likes, setLikes] = React.useState(props.likes);
  const [likedNew, setLikedNew] = React.useState(false);
  const commentsLinkedList = new LinkedList();
  let iteratorCommentsLinkedList = commentsLinkedList.items();
  let newDescription = props.newDescription;

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
  //getCommentsToLinkedList();
  //console.log(commentsLinkedList);

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
    console.log(commentsLinkedList);
  };

  const handleLikeClick = () => {
    setLikes(likes + 1);
    db.collection("news")
      .doc(props.id)
      .update({ likes: likes + 1 });
    setLikedNew(true);
  };

  const getHashTags = () => {
    let hashTags: string[] = [];
    const charArray = props.newDescription.split("");
    charArray.map((word, index) => {
      if (word === "#") {
        let tempIndex = index + 1;
        let hashTag = "#";
        while (charArray[tempIndex] !== " ") {
          if (tempIndex === charArray.length) break;
          else {
            hashTag += charArray[tempIndex];
            tempIndex += 1;
          }
        }
        if (hashTag !== "#") hashTags.push(hashTag);
      }
    });
    return hashTags;
  };

  const getNewDescription = () => {
    getHashTags().map((hashtag) => {
      let regex = new RegExp(hashtag, "gi");
      newDescription = newDescription.replace(regex, "");
    });
    return newDescription.trim();
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
          <p style={{ fontSize: "18.5px", marginBottom: 3 }}>{getNewDescription()}</p>
          <div className="row mt-0 mb-0 " style={{marginLeft: 2}}>
            {getHashTags().map((hashtag,index) => {
              if(index ===0) return <span className="badge badge-primary" key={index}>{hashtag}</span>; 
              else return <span className="badge badge-primary ml-2" key={index}>{hashtag}</span>;
            })}
          </div>
          <div className="row" style={{ marginTop: "15px" }}>
            <div className="col-6">
              <div className="row">
                <div className="col-2 mt-1">
                  <h5>
                    <span className="badge badge-dark">{likes}</span>
                  </h5>
                </div>
                <div className="col-10">
                  {!likedNew ? (
                    <div className="like-button" onClick={handleLikeClick}>
                      <svg
                        className="bi bi-heart"
                        width="1.5em"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-weight-bold ml-3 span-title">
                        Me gusta
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="like-button">
                        <svg
                          className="bi bi-heart-fill"
                          width="1.5em"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="#ff9966"
                            fillRule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-weight-bold ml-3 span-title">
                          Te gusta
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-6 float-right mr-0">
              <Button name={"Comentar"} action={onClickComment} />
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
