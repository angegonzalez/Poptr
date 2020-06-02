import { PriorityQueue } from "./PriorityQueue";
import { TurnProps } from "../components/Turn";



let queue = new PriorityQueue<TurnProps>(3);
queue.insert({
    priority: 10,
    name: "Mrs. Telly ",
    time: 5,
})
queue.insert({
    priority: 2,
    name: "Prueba de cola",
    time: 7,

})
queue.insert({
    priority: 2,
    name: "Angel Gonzalez ",
    time: 7,
})

export default queue;