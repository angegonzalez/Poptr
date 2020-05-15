import React from "react";
import "../styles/LandingNew.css";
export interface LandingNewProps {
  name: string;
  description: string;
  timeAgo: string;
  photo: string;
}

const LandingNew: React.SFC<LandingNewProps> = (props) => {
  return (
    <div className="landing-new mt-4">
      <div className="media">
        <img src={props.photo} className="mr-3" alt="..." style= {{width: 60}} />
        <div className="media-body">
          <h5 className="mt-0 mb-0">{props.name}</h5>
          <p className="mt-0 mb-0">{props.description}</p>
          <span className="badge badge-primary">{props.timeAgo} mins ago.</span>
        </div>
      </div>
    </div>
  );
};

export default LandingNew;
