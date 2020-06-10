import * as React from "react";

export interface TurnProps {
  transactionName: string;
  campus: string;
  campusLocation: string;
  imgPlace: string;
  priority: number;
}

const Turn: React.SFC<TurnProps> = (props) => {
  return (
    <div className="card mb-3">
      <img
        src={props.imgPlace}
        className="card-img-top"
        alt="..."
        style={{ height: 250 }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.transactionName}</h5>
        <p className="card-text">
          {props.campus} · {props.campusLocation}
        </p>
        <p className="card-text">
          <small className="text-muted">quedan {props.priority} segundos para realizar tu trámite</small>
        </p>
      </div>
    </div>
  );
};

export default Turn;
