import * as React from 'react';
import "../styles/Button.css";
export interface ButtonProps {
    name: String
    action: () => void;
}
 
const Button: React.SFC<ButtonProps> = (props) => {
    return (
        <div className="main-button" onClick={props.action}>
            <span>{props.name}</span>
        </div>
    )
}
 
export default Button;