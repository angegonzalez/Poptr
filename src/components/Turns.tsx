import * as React from "react";
import queue from "../classes/Turns";
import Turn, { TurnProps } from "./Turn";
import { PriorityQueue } from "../classes/PriorityQueue";

export interface TurnsProps {}

const Turns: React.SFC<TurnsProps> = () => {
  const turns = queue;  

  const updateQueue = () =>{
      turns.extractMax();
      console.log(turns.heap)
  }
  
  return (
    <div className="turns-container">
        
      {turns.heap.map((turn, index) => {
        return (
          <Turn
            name={turn.data.name}
            priority={turn.data.priority}
            time={turn.data.time}
            updateQueue ={updateQueue}
            key={index}
          ></Turn>
        );
      })}
    </div>
  );
};

export default Turns;
