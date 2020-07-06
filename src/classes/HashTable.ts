import { LinkedList } from "./LinkedList";
import { UserProps } from "../components/User";

interface myNew {
    id: string;
    userNameNew: string;
    userDescription: string;
    newDescription: string;
    userPhotoNew: string;
    likes: number;
}



export class HashTable {

    length: number;
    loadFactor: number;
    count: number;
    myHashTable: Array<LinkedList<UserProps>>;

    constructor(length: number) {
        this.length = length;
        this.loadFactor = 0;
        this.count = 0;
        this.myHashTable = new Array<LinkedList<UserProps>>(length);
    }

    public getPolyHash = (s: string, p: number) => {
        let hash = 0;

        for (let i = 0; i < s.length; i += 1) {
            hash = ((((hash << 5) - hash) + s.charCodeAt(i))) % p;
            hash |= 0;
            // hash = (hash + s.charCodeAt(i) * (Math.pow(31, s.length - 1 - i))) %p; 
        }
        return hash;
    }

    public add = (element: UserProps) => {
        let myPosition = this.getPolyHash(element.user, this.length);

        if (this.loadFactor >= 1.25) this.doubleCapacity();

        if (this.myHashTable[myPosition] === undefined) {
            this.myHashTable[myPosition] = new LinkedList<any>();
        }
        this.myHashTable[myPosition].pushBack(element);
        this.count++;
        this.updateLoadFactor();
    }

    public updateLoadFactor() {
        this.loadFactor = (this.count * 100 / this.length) / 100
    }

    private doubleCapacity = () => {
        console.log('Here my capacity')
        let myNewLength = this.length * 2;
        let myOldHT = this.myHashTable;
        let myNewHT = new Array<LinkedList<UserProps>>(myNewLength);
        this.length = myNewLength;
        this.myHashTable = myNewHT;
        this.count = 0;
        this.updateLoadFactor();

        myOldHT.forEach(list => {
            if (list.head) {
                let myTempNode = list.head;
                while (myTempNode !== null) {
                    this.add(myTempNode.data);
                    myTempNode = myTempNode.next!;
                }
            }
        })

    }
}



