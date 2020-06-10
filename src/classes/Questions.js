/*
import Questions from "../data/questions01.json";
import { Queue } from "../classes/Queue";
import queue from "./Turns";

export const testQuestions1K = () => {
   
    let qqueue = new Queue();
    console.time('Enqueue');
    Questions.map(question => {
        qqueue.enqueue(question);
    })
    console.timeEnd('Enqueue');

    console.log(qqueue);

    console.time('Dequeue');
    qqueue.dequeue();
    console.timeEnd('Dequeue');
    
    console.time('check');
    qqueue.checkQueue();
    console.timeEnd('check');

    console.time('peek');
    qqueue.peek();
    console.timeEnd('peek');

}
*/