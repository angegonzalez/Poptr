import React from "react";
import Toast from "react-bootstrap/Toast";

export interface TaskProps {
  description: String;
  name: String;
}

const Task: React.SFC<TaskProps> = (props) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Intl.DateTimeFormat("en-US", options).format;
  return (
    <Toast show={true} animation={true}>
      <Toast.Header closeButton={false}>
        <strong className="mr-auto">{props.name}</strong>
        <small>{"justo ahora " + " · " + date(Date.now())}</small>
      </Toast.Header>
      <Toast.Body>
        <p>{props.description}</p>
      </Toast.Body>
    </Toast>
  );
};

export default Task;
