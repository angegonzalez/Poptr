export class Node<T>{
    //Node data
    data: T | any;
    constructor(data: T) {
        this.data = data;
    }
}

export class PriorityQueue<T>{
    heap: Array<Node<T>>;
    size: number;
    count: number;
    maxSize: number;

    constructor(maxSize: number, heap?: Array<Node<T>>, size?: number, count?: number) {
        if (maxSize && heap && size && count) {
            this.heap = heap;
            this.size = size;
            this.maxSize = maxSize;
            this.count = count;
        }
        else {
            this.heap = new Array<Node<T>>(maxSize)
            this.size = 0
            this.maxSize = maxSize
            this.count = 1;
        }

    }

    public parent = (i: number): number => {
        return Math.floor(i / 2);
    }
    public leftChild = (i: number): number => {
        return 2 * i;
    }
    public rightChild = (i: number): number => {
        return 2 * i + 1;
    }

    public insert = (data: T): boolean => {
        if (this.size == this.maxSize) {
            console.log("Full queue");
            return false;
        } else {
            this.size++;
            this.heap[this.size] = new Node(data);
            this.siftUp(this.size);
            return true;
        }

    }

    public traverse() {
        for (let i = 1; i <= this.size; i++) {
            console.log(this.heap[i]);
        }
    }


    public traverseS() {  //traverse the sorted array
        for (let i = this.count; i >= 1; i--) {
            console.log(this.heap[i]);
        }
    }
    public siftUp = (i: number) => {

        while (i > 1 && this.heap[this.parent(i)].data.priority < this.heap[i].data.priority) {
            let tmp = this.heap[this.parent(i)];
            this.heap[this.parent(i)] = this.heap[i];
            this.heap[i] = tmp;
            i = this.parent(i);
        }
    }
    public siftDown = (i: number) => {
        let maxIndex = i;
        let l = this.leftChild(i);
        if (l <= this.size && this.heap[l].data.priority > this.heap[maxIndex].data.priority) {
            maxIndex = l;
        }
        let r = this.rightChild(i);
        if (r <= this.size && this.heap[r].data.priority > this.heap[maxIndex].data.priority) {
            maxIndex = r;
        }
        if (i !== maxIndex) {

            let tmp = this.heap[i];
            this.heap[i] = this.heap[maxIndex];
            this.heap[maxIndex] = tmp;
            this.siftDown(maxIndex);
        }

    }

    public heapSort() {
        let n = this.size;
        for (let i = 1; i < n; i++) {
            let tmp = this.heap[1];
            this.heap[1] = this.heap[this.size];
            this.heap[this.size] = tmp;
            this.size--;
            this.count++;
            this.siftDown(1);
        }
    }

    /*public extractMax(){ para arreglo ordenado

     //console.log(this.count);  "new size" since size is now 0 after the heap sort 
       let max = this.heap[this.count];
       this.heap[this.count] = this.heap[1];
       this.count--;
       this.siftDown(this.count);
       console.log(max);

    }*/

    public extractMax() {

        let max = this.heap[1];
        this.heap[1] = this.heap[this.size];
        this.heap.pop();
        this.size--;
        this.siftDown(1);

        return max;

    }

    public remove = (i: number) => {

        this.heap[i].data.priority = Number.MAX_SAFE_INTEGER;
        this.siftUp(i);
        //let removed = this.extractMax();
        //console.log("Removed: "+ removed.data.name);

    }

    public changePriority = (i: number, p: number) => {

        let oldPr = this.heap[i].data.priority;
        this.heap[i].data.priority = p;
        if (p > oldPr) {
            this.siftUp(i);
        } else
            this.siftDown(i);

    }

    public getQueue = () => {
        return this.heap;
    }


}