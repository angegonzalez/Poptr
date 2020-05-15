import React from "react";

export interface UserProps {
  user: string;
  userDescription: string;
  userName: string;
  userPhoto: string;
}

const User: React.SFC<UserProps> = (props) => {
  return (
    <div className="card mt-2" style={{padding: ".5rem  "}}>
      <div className="media mt-1">
        <img
          src={props.userPhoto}
          width="40"
          height="40"
          className="d-inline-block align-top"
          alt=""
        />
        <div className="media-body">
          <h6 className="ml-2 mb-0">{props.userName}</h6>
          <p className="ml-2 mt-0 mb-1 font-weight-light" style={{fontSize: 12}}>
            {props.userDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default User;
