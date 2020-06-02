
export class LinkedListNode<T> {
    data: T | any;
    next: LinkedListNode<T> | null

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}
export class LinkedList<T>{
    public head: LinkedListNode<T> | null;
    public tail: LinkedListNode<T> | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    public pushFront = (data: T) => {
        const node = new LinkedListNode(data)
        node.next = this.head
        this.head = node
        if (this.tail === null) {
            this.tail = this.head
        }
    }

    public pushBack = (data: T) => {
        const node = new LinkedListNode(data)
        if (this.tail === null) {
            this.head = node
            this.tail = node
        }
        else {
            this.tail.next = node
            this.tail = node
        }
    }

    public *items() {
        let node = this.head;
        while (node) {
            yield node;
            node = node.next
        }
    }

    public traverse() {
        if (this.head === null) {
            console.log("This list is empty")
        }
        else {
            let node = this.head;
            while (node !== null) {
                console.log(node);
                node = node.next!;
            }
        }
    }

   public search = (sdata :T) => {

        let node = this.head;
        while(node !== null){
            if ((node.data.userName === sdata)||(node.data.userPhoto === sdata)||(node.data.userDescription === sdata)||(node.data.user === sdata)){
                console.log("Data found");
                console.log(node.data);
                return node;
            }
            node = node.next!;
        }
        console.log("Data is not in the list");
        return node;
        
        }
        
    public updateNode = (prevdata : T, newdata: T) => {
        
        let node = this.head;
        while(node !== null){
            if (node.data.userName === prevdata){
                node.data.userName = newdata;
                break;
            }else if(node.data.userPhoto === prevdata){
                node.data.userPhoto = newdata;
                break;
            }else if(node.data.userDescription === prevdata){
                node.data.userDescription = newdata;
                break;
            }else if(node.data.user === prevdata){
                node.data.user = newdata;
                break;
            }
            node = node.next!;
        }

        if (node == null){
            console.log("Data is not in the list");
            return null;
        } 
        console.log("Data updated");
            console.log(node);
            return node; 
    } 

    public removeNode(index : number){

        if(this.head === null || index < 0){
            throw new RangeError('Index is not part of the list or the list does not exist');
        }
        if (index === 0){
            const hdata = this.head.data;
            this.head = this.head.next;
            return hdata;
        }

        let curr = this.head;
        let previous = this.head;
        let i = 0;
        while((curr.next !== null) && (i<index)){
            previous = curr; 
            curr = curr.next;
            i++;
        }

        if(curr !== null){
            previous.next = curr.next;
        }
        console.log("Removed : ");
        console.log(curr.data);
        
    }

    public length(){
        let count = 0;
        let node = this.head;
        while(node !== null){
            count++;
            node = node.next;
        }
        return count;
    }

    public isEmpty(): boolean{
        if (this.head === null) return true;
        return false;
    }

    public getItems(){
        let node = this.head;
        let itemsArray = [];
        while(node !== null){
            itemsArray.push(node.data)
            node = node.next;   
        }
        return itemsArray;
    }

    public toArray(){
        let node = this.head;
        let array = []
        while(node !== null){
            array.push(node.data)
            node = node.next
        }
        return array;
    }
}