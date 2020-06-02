import Turns from "../data/Turns.json";
import { PriorityQueue } from "../classes/PriorityQueue";

export const testTurns10K = () => {
    let queue = new PriorityQueue(30);
    
    console.time('Fill the queue');
    Turns.map(turn => {
        queue.insert(turn);
    } )
    console.log(queue.heap);
    console.timeEnd('Fill the queue')
        
    console.time('extractMax');
    queue.extractMax();;
    console.log(queue.heap);
    console.timeEnd('extractMax');

    /*
    console.time('remove');
    queue.remove(9);
    console.log(queue.heap);
    console.timeEnd('remove');

    console.time('traverse');
    queue.traverse();
    console.log(queue.heap);
    console.timeEnd('traverse');

    console.time('changeP');
    queue.changePriority(3, 11);
    console.log(queue.heap);
    console.timeEnd('changeP');
    
    console.time('Heap sort');
    queue.heapSort();
    console.log(queue.heap);
    console.timeEnd('Heap sort');

    console.time('traverseS');
    queue.traverseS();
    console.log(queue.heap);
    console.timeEnd('traverseS');
    */
    


}