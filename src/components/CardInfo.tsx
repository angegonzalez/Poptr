import React from "react";
import "../styles/CardInfo.css";

export interface CardInfoProps {
  title: string;
  description: string;
  color: string;
  img: string;
}

const CardInfo: React.SFC<CardInfoProps> = props => {
  return (
    <>
      <div className="card-info" style= {{borderLeft: `4px ${props.color} solid` }}>
        <div className="media">
          <img src={props.img} className="mr-3" alt="..." />
          <div className="media-body">
            <h5 className="mt-0">Media heading</h5>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
            scelerisque ante sollicitudin. Cras purus odio, vestibulum in
            vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
            vulputate fringilla. Donec lacinia congue felis in faucibus.
          </div>
        </div>
      </div>
    </>
  );
};

export default CardInfo;
