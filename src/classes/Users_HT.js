/*
import { HashTable } from "./HashTable";
import users from "../data/userData03.json";

let usersHashTable = new HashTable(500000);

export const testUsers10K = () => {

    console.time('fill');
    //Fill with 10K data test
    users.map(user => {
        usersHashTable.add(user)
    });
    console.timeEnd('fill');

    console.log(usersHashTable)

    //let userToSearch = 'Ashlynn_Lindgren@odell.us';
    //let userToSearch = 'Janie@archibald.biz';

    /*
    console.time('search');
    let mySearchPosition = usersHashTable.getPolyHash(userToSearch, usersHashTable.myHashTable.length);
    //console.log(mySearchPosition);
    let mySearchLinkedList = usersHashTable.myHashTable[mySearchPosition];
    if (mySearchLinkedList !== undefined) {
        console.log(mySearchLinkedList.searchUser(userToSearch).data)
    }
    console.timeEnd('search');
    */

// }