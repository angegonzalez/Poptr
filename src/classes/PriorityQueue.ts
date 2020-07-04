export class Node<T>{
    //Node data
    data: T | any;
    constructor(data: T) {
        this.data = data;
    }
}

export class PriorityQueue<T>{
    heap: Node<T>[];
    size: number;
    count: number;
    maxSize: number;

    constructor(maxSize?: number, heap?: Node<T>[], size?: number, count?: number) {
        if (heap && size) {
            this.heap = heap;
            this.size = size;
            this.maxSize = maxSize!;
            this.count = count!;
        }
        else {
            this.heap = []
            this.size = 0
            this.maxSize = 1;
            this.count = 0;
        }

    }

    public parent = (i: number): number => {
        return Math.floor((i - 1) / 2);
    }
    public leftChild = (i: number): number => {
        return (2 * i + 1);
    }
    public rightChild = (i: number): number => {
        return (2 * i + 2);
    }

    public insert = (data: T): boolean => {
        this.size++;
        let curr = this.size - 1;
        this.heap[curr] = new Node(data);
        this.siftUp(curr);
        return true;
    }

    public traverse() {
        for (let i = 0; i < this.size; i++) {
            console.log(this.heap[i]);
        }
    }


    public traverseS() {  //traverse the sorted array
        for (let i = this.count; i >= 0; i--) {
            console.log(this.heap[i]);
        }
    }

    public siftUp = (i: number) => {

        while (i >= 1 && this.heap[i].data.priority < this.heap[this.parent(i)].data.priority) {
            let tmp = this.heap[this.parent(i)];
            this.heap[this.parent(i)] = this.heap[i];
            this.heap[i] = tmp;
            i = this.parent(i);
        }
    }
    public siftDown = (i: number) => {
        let minIndex = i;
        let l = this.leftChild(i);
        if (l < this.size && this.heap[l].data.priority < this.heap[minIndex].data.priority) {
            minIndex = l;
        }
        let r = this.rightChild(i);
        if (r < this.size && this.heap[r].data.priority < this.heap[minIndex].data.priority) {
            minIndex = r;
        }
        if (minIndex !== i) {

            let tmp = this.heap[i];
            this.heap[i] = this.heap[minIndex];
            this.heap[minIndex] = tmp;
            this.siftDown(minIndex);
        }

    }

    public heapSort() {
        let n = this.size;
        for (let i = 0; i < n; i++) {
            let tmp = this.heap[0];
            this.heap[0] = this.heap[this.size - 1];
            this.heap[this.size - 1] = tmp;
            this.size--;
            this.count++;
            this.siftDown(0);
        }
    }


    /*public extractMax() {

        let max = this.heap[1];
        this.heap[1] = this.heap[this.size];
        this.heap.pop();
        this.size--;
        this.siftDown(1);

        return max;

    }*/


    public extractMin() {

        if (this.size === 0) return
        //let min = this.heap[0];
        console.log(this.heap[0])
        this.heap[0] = this.heap[this.size - 1];
        let myHeap = this.heap;
        myHeap.pop()
        this.heap = myHeap;
        //console.log(min.data);
        this.size--;
        this.siftDown(0);

        return this.heap;

    }

    public remove = (i: number) => {

        this.changePriority(i, Number.MIN_SAFE_INTEGER);
        this.extractMin();
        //let removed = this.extractMax();
        // if (removed) console.log("Removed: " + removed.data.name);

    }

    public changePriority = (i: number, p: number) => {

        let oldPr = this.heap[i].data.priority;
        this.heap[i].data.priority = p;
        if (p < oldPr) {
            this.siftUp(i);
        } else
            this.siftDown(i);

    }

    public getQueue = () => {
        return this.heap;
    }


}