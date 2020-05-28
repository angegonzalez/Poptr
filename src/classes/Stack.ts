import { LinkedList } from "./LinkedList";

export class Stack<T>{
    public stack : LinkedList<T>;

    constructor(){
        this.stack = new LinkedList();
    }

    public push(data: T){
        this.stack.pushFront(data);
    }
    public pop(){
        this.stack.removeNode(0);
    }
    public isEmpty(): boolean {
       return this.stack.isEmpty();
    }

}

