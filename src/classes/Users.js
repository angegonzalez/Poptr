/* import { LinkedList } from "./LinkedList";
import users from "../data/userData.json";
import users02 from "../data/userData02.json";
import users03 from "../data/userData03.json";
import users04 from "../data/userData04.json";

export const testUsers10K = () => {
    //Logic for users using a Linked List
    let userLinkedList = new LinkedList();

    //Initialize time
    console.time('fill')
    //Fill with 10000 data test 
    users.map(user => {
        userLinkedList.pushBack(user)
    })
    //End process
    console.timeEnd('fill')
    //Traverse all the list 
    //Init time 
    console.time('traverse')
    userLinkedList.traverse();
    //End process
    console.timeEnd('traverse')
}


export const testUsers100K = () => {
    let userLinkedList = new LinkedList();
    //Initialize time
    console.time('fill')
    //Fill with 100K data test 
    users02.map(user => {
        userLinkedList.pushBack(user) // O(1) Operation 
    })
    //End process
    console.timeEnd('fill')

    //Traverse all the list 
    //Init time 
    console.time('traverse')
    userLinkedList.traverse(); // O(n) Operation
    //End process
    console.timeEnd('traverse')




}
export const testUsers500K = () => {
    let userLinkedList = new LinkedList();

    //Initialize time
    console.time('fill')
    //Fill with 500K data test 
    users03.map(user => {
        userLinkedList.pushBack(user)
    })
    //End process
    console.timeEnd('fill')
    //Traverse all the list 
    //Init time 
    console.time('traverse')
    userLinkedList.traverse()
    //End process
    console.timeEnd('traverse')
}

export const testUsers1M = () => {
    let userLinkedList = new LinkedList();
    //Initialize time
    console.time('fill')
    //Fill with 1M data test 
    users04.map(user => {
        userLinkedList.pushBack(user)
    })
    //End process
    console.timeEnd('fill')
    //Traverse all the list 
    //Init time 
    console.time('traverse')
    userLinkedList.traverse();
    //End process
    console.timeEnd('traverse')
}

 */