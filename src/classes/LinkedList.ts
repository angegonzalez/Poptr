
export class LinkedListNode <T> {
    data: T 
    next: LinkedListNode<T> | null

    constructor(data: T){
        this.data= data;
        this.next= null;
    }
}
export class LinkedList<T>{
    private head: LinkedListNode<T> | null ;
    private tail: LinkedListNode<T> | null ;

    constructor(){
        this.head= null;
        this.tail= null;
    }

    public pushFront = (data: T) => {
        const node = new LinkedListNode(data)
        node.next = this.head
        this.head= node
        if(this.tail === null){
            this.tail= this.head
        }   
    }

    public pushBack = (data: T) => {
        const node = new LinkedListNode(data)
        if(this.tail === null){
            this.head= node
            this.tail= node
        }
        else{
            this.tail.next= node
            this.tail= node
        }
    }

    public *items(){
        let node = this.head;
        while(node){
            yield node;
            node= node.next
        }
    }

    public map( callbackFunction: Function ){
        let itemtoR =[];
        let iterator = this.items();
        while(true){
            let item = iterator.next();
            if(item.done) break;
            else{
                itemtoR.push(callbackFunction(item.value.data))
            }
        }
        return itemtoR;

    }


}