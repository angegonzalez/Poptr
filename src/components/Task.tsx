import React from "react";
import Toast from "react-bootstrap/Toast";

export interface TaskProps {
  description: String;
  name: String;
  delay?: number;
}

const Task: React.SFC<TaskProps> = (props) => {
  const [showTask, setshowTask] = React.useState(true);
  let options = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const date = new Intl.DateTimeFormat("en-US", options).format;
  return (
    <Toast
      show={showTask}
      delay={props.delay! + 5000}
      autohide={true}
      animation={true}
      onClose={() => setshowTask(false)}
    >
      <Toast.Header closeButton={true}>
        <img
          src="https://image.flaticon.com/icons/svg/838/838565.svg"
          className=" mr-2"
          width={17}
          height={15}
        ></img>
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
