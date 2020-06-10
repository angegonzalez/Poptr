import { LinkedList } from "../classes/LinkedList";

export class Queue<T>{

    public queue: LinkedList<T>;
    public length: number;

    public constructor(queue?: LinkedList<T>, length?: number) {
        if (queue && length) {
            this.queue = queue;
            this.length = length
        }
        else {
            this.queue = new LinkedList();
            this.length = 0;
        }

    }

    public enqueue(data: T) {
        this.queue.pushBack(data);
        this.length++;
    }

    public dequeue() {
        this.length--;
        return this.queue.removeNode(0);
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public checkQueue() {
        this.queue.traverse();
    }

    public peek() {

        if (this.queue.head) {
            return this.queue.head;
        } else
            return null;

    }
}