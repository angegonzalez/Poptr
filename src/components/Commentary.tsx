import React from 'react'

export interface CommentaryProps {
    userName: string;
    userComment: string;
    userPhoto: string;
}
 
const Commentary: React.SFC<CommentaryProps> = (props) => {
    return ( 
        <>
        <div className="media" style={{borderLeft: "3.5px solid #ff5e62", paddingLeft: "10px"}}>
            <img
              src={props.userPhoto}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt=""
            />
            <div className="media-body">
              <h6 className="ml-2 mb-0">{props.userName}</h6>
              <p className="ml-2">{props.userComment} </p>
            </div>
          </div>
        </>

     );
}
 
export default Commentary;