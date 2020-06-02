import React from "react";

export interface TurnProps {
  priority: number;
  name: String;
  time: number;
  updateQueue?: () => void;
}

const Turn: React.SFC<TurnProps> = (props) => {
  const [timeLeft, settimeLeft] = React.useState(props.time);

  React.useEffect(() => {
    if (timeLeft !== 0) {
      setTimeout(() => {
        settimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      return () => {
        settimeLeft(props.time);
      };
    }
  });
  return (
    <>
      {timeLeft === 0 ? (
        props.updateQueue!()
      ) : (
        <div className="turn-card">
          <h2>{props.name}</h2>
          <small>{timeLeft} seconds left</small>
        </div>
      )}
    </>
  );
};

export default Turn;
