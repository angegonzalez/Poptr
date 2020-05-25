
export class Node<T>{
    //Balance factor
    bf: number;
    //Node data
    value: T | any;
    //Node height 
    height: number;
    //Left and right children of this  node
    left: Node<T> | null;
    right: Node<T> | null;

    constructor(value: T | any) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.bf = 0;
        this.height = 0;
    }
}

export class AVLTree<T>{
    root!: Node<T> | null;
    nodeCount = 0;

    constructor() {
        this.root = null;
    }

    //Height of the tree
    public height = (): number => {
        if (this.root === null) return 0;
        return this.root.height;
    }
    //Nodes in the tree
    public size = (): number => {
        return this.nodeCount;
    }
    //Tree is empty ?
    public isEmpty = (): boolean => {
        return this.size() === 0
    }

    //The tree contains a node 
    public contains = (value: T | any, node: Node<T> | null): boolean => {
        if (node === null) return false;
        let comp = value.count - node.value.count;
        if (comp > 0) return this.contains(value, node.right)
        if (comp < 0) return this.contains(value, node.left)
        return true;
    }

    //Insert a value
    public add = (value: T): boolean => {
        if (value === null) return false;

        if (!this.contains(value, this.root)) {
            this.root = this.insert(this.root, value);
            this.nodeCount++;
            return true;
        }
        return false;
    }

    //Insert a node inside the tree

    private insert = (node: Node<T> | null, value: T | any): Node<T> => {
        if (node === null) return new Node(value);

        let comp: number = value.count - node.value.count;

        if (comp < 0) node.left = this.insert(node.left, value);
        else node.right = this.insert(node.right, value);

        this.update(node);
        return this.balance(node);
    }
    //Update height and bf of a node

    private update = (node: Node<T>) => {
        let leftNodeHeight = (node.left === null) ? -1 : node.left.height;
        let rightNodeHeight = (node.right == null) ? -1 : node.right.height;
        //Update node's height.
        node.height = 1 + Math.max(leftNodeHeight, rightNodeHeight);
        //Update balance factor
        node.bf = rightNodeHeight - leftNodeHeight;
    }
    //Rebalance a node if its balance factor is not (-1,0,1)
    private balance = (node: Node<T>): Node<T> => {
        if (node.bf === -2) {
            //Left left case 
            if (node.left!.bf <= 0) {
                return this.leftLeftCase(node);
            }
            //Left right case 
            else {
                return this.leftRightCase(node);
            }
        }
        else if (node.bf === 2) {
            //Right right case
            if (node.right!.bf >= 0) {
                return this.rightRightCase(node);
            }
            else {
                return this.rightLeftCase(node);
            }
        }

        return node;
    }
    private leftLeftCase = (node: Node<T>): Node<T> => {
        return this.rightRotation(node);
    }
    private leftRightCase = (node: Node<T>): Node<T> => {
        node.left = this.leftRotation(node.left);
        return this.leftLeftCase(node);
    }
    private rightRightCase = (node: Node<T>): Node<T> => {
        return this.leftRotation(node);
    }
    private rightLeftCase = (node: Node<T>): Node<T> => {
        node.right = this.rightRotation(node.right);
        return this.rightRightCase(node);
    }
    private leftRotation = (node: Node<T> | null) => {
        let newParent = node!.right!;
        node!.right = newParent.left!;
        newParent.left = node;
        this.update(node!);
        this.update(newParent);
        return newParent;
    }
    private rightRotation = (node: Node<T> | null) => {
        let newParent = node!.left!;
        node!.left = newParent.right!;
        newParent.right = node;
        this.update(node!);
        this.update(newParent);
        return newParent;
    }

    public getTop2 = (): string[] => {
        if (this.root) {
            let node = this.root;
            while (node.right!.right !== null) {
                node = node.right!;
            }
            return [node.right!.value.hashTag + ': ' + node.right!.value.count,
            node.value.hashTag + ': ' + node.value.count]
        }
        return []
    }

    public remove(element: T): boolean {
        if (element === null) return false;
        if (this.contains(element, this.root)) {
            this.root = this.delete(this.root, element)
            this.nodeCount -= 1;
            return true;
        }
        return false;
    }

    private delete(node: Node<T> | null, element: T | any): Node<T> | null {
        if (node === null) return null;
        //Compare if the value is equal
        let comp = element.count - node.value.count;
        //Search left tree
        if (comp < 0) node.left = this.delete(node.left, element)
        //Search right tree
        else if (comp > 0) node.right = this.delete(node.right, element)
        else {
            //Value were found
            if (node.left === null) return node.right;
            else if (node.right === null) return node.left;
            else {
                //Remove from the left subtree
                if (node.left.height > node.right.height) {
                    let successorValue = this.findMax(node.left);
                    node.value = successorValue;
                    node.left = this.delete(node.left, successorValue);
                }
                //Remove from the right subtree
                else {
                    let successorValue = this.findMin(node.right);
                    node.value = successorValue;
                    node.right = this.delete(node.right, successorValue);
                }
            }
        }
        this.update(node);
        return this.balance(node);
    }
    private findMin = (node: Node<T>): T | any => {
        while (node.left !== null) node = node.left;
        return node.value;
    }
    private findMax = (node: Node<T>): T | any => {
        while (node.right !== null) node = node.right;
        return node.value;
    }


}