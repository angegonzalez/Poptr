import React from 'react'

export interface CommentaryProps {
    userName: string;
    userComment: string;
}
 
const Commentary: React.SFC<CommentaryProps> = (props) => {
    return ( 
        <>
        <div className="media">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt=""
            />
            <div className="media-body">
              <h6 className="ml-2">{props.userName}</h6>
              <p className="ml-2">{props.userComment} </p>
            </div>
          </div>
        </>

     );
}
 
export default Commentary;