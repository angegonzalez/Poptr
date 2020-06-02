import { LinkedList } from "./LinkedList";

export class Stack<T>{
    public stack : LinkedList<T>;
    public length : number;

    constructor(){
        this.stack = new LinkedList();
        this.length =0;
    }

    public push(data: T){
        this.stack.pushFront(data);
        this.length+=1;
    }
    public pop(){
        this.stack.removeNode(0);
        this.length-=1;
    }
    public isEmpty(): boolean {
       return this.length ===0;
    }

}

