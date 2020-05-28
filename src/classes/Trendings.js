//import hashTags from "../data/hashTagsData.json";
//import hashTags02 from "../data/hashTagsData02.json";
//import hashTags03 from "../data/hashTagsData02.json";
//import { AVLTree } from "./AVLTree";

/*export const testTrendings10K = () => {
    let tree = new AVLTree();

    //Fill the tree O(n)
    console.time('Fill the tree [ O(n) operation ]');
    hashTags.map(hashTag => {
        tree.add(hashTag);
    })
    console.timeEnd('Fill the tree [ O(n) operation ]')

    //The tree contains value X?
    console.time('Contains [ O(log(n)) operation ]');
    const search = {
        hashTag: "c74057cb89bf9ae663ce90bc5f98ae46a18f",
        count: 99
    }
    console.log("Contains the value " + search.count + " : " + tree.contains(search, tree.root))
    console.timeEnd('Contains [ O(log(n)) operation ]')

    //Get 2 maximum values 
    console.time('Get top 2 [ O(log(n)) operation ]');
    console.log("Top 2 maximum values: ")
    let result = tree.getTop2()
    console.log(result[0])
    console.log(result[1])
    console.timeEnd('Get top 2 [ O(log(n)) operation ]')

    //Remove an element
    console.time('Remove an element [ O(log(n)) operation ]');
    tree.remove({
        hashTag: 'Prueba',
        count: 9998
    })
    console.timeEnd('Remove an element [ O(log(n)) operation ]');
}*/


/* export const testTrendings100K = () => {
    let tree = new AVLTree();

    //Fill the tree O(n)
    console.time('Fill the tree [ O(n) operation ]');
    hashTags02.map(hashTag => {
        tree.add(hashTag);
    })
    console.timeEnd('Fill the tree [ O(n) operation ]')

    //The tree contains value X?
    console.time('Contains [ O(log(n)) operation ]');
    const search = {
        hashTag: "c74057cb89bf9ae663ce90bc5f98ae46a18f",
        count: 10000
    }
    console.log("Contains the value " + search.count + " : " + tree.contains(search, tree.root))
    console.timeEnd('Contains [ O(log(n)) operation ]')

    //Get 2 maximum values 
    console.time('Get top 2 [ O(log(n)) operation ]');
    console.log("Top 2 maximum values: ")
    let result = tree.getTop2()
    console.log(result[0])
    console.log(result[1])
    console.timeEnd('Get top 2 [ O(log(n)) operation ]')

    //Remove an element
    console.time('Remove an element [ O(log(n)) operation ]');
    tree.remove({
        hashTag: 'Prueba',
        count: 99999
    })
    console.timeEnd('Remove an element [ O(log(n)) operation ]');
}
*/
/*
export const testTrendings1M = () => {
    let tree = new AVLTree();

    //Fill the tree O(n)
    console.time('Fill the tree [ O(n) operation ]');
    hashTags03.map(hashTag => {
        tree.add(hashTag);
    })
    console.timeEnd('Fill the tree [ O(n) operation ]')

    //The tree contains value X?
    console.time('Contains [ O(log(n)) operation ]');
    const search = {
        hashTag: "c74057cb89bf9ae663ce90bc5f98ae46a18f",
        count: 10000
    }
    console.log("Contains the value " + search.count + " : " + tree.contains(search, tree.root))
    console.timeEnd('Contains [ O(log(n)) operation ]')

    //Get 2 maximum values 
    console.time('Get top 2 [ O(log(n)) operation ]');
    console.log("Top 2 maximum values: ")
    let result = tree.getTop2()
    console.log(result[0])
    console.log(result[1])
    console.timeEnd('Get top 2 [ O(log(n)) operation ]')

    //Remove an element
    console.time('Remove an element [ O(log(n)) operation ]');
    tree.remove({
        hashTag: 'Prueba',
        count: 999999
    })
    console.timeEnd('Remove an element [ O(log(n)) operation ]');
}

export const testTrendings10M = () => {
    let hashTag = "#Testht10M";

    let tree = new AVLTree();

    //Fill the tree O(n)
    console.time('Fill the tree [ O(n) operation ]');
    for(let i =0; i<10000000; i+=1){
        tree.add({
            hashTag: hashTag,
            count: i,
        });
    }
    console.timeEnd('Fill the tree [ O(n) operation ]')

    //The tree contains value X?
    console.time('Contains [ O(log(n)) operation ]');
    const search = {
        hashTag: "Dummy text ",
        count: 9000000
    }
    console.log("Contains the value " + search.count + " : " + tree.contains(search, tree.root))
    console.timeEnd('Contains [ O(log(n)) operation ]')

    //Get 2 maximum values 
    console.time('Get top 2 [ O(log(n)) operation ]');
    console.log("Top 2 maximum values: ")
    let result = tree.getTop2()
    console.log(result[0])
    console.log(result[1])
    console.timeEnd('Get top 2 [ O(log(n)) operation ]')

    //Remove an element
    console.time('Remove an element [ O(log(n)) operation ]');
    tree.remove({
        hashTag: 'Prueba',
        count: 9999999
    })
    console.timeEnd('Remove an element [ O(log(n)) operation ]');
}

export const testTrendings50M = () => {
    let hashTag = "#Testht50M";

    let tree = new AVLTree();

    //Fill the tree O(n)
    console.time('Fill the tree [ O(n) operation ]');
    for(let i =0; i<50000000; i+=1){
        tree.add({
            hashTag: hashTag,
            count: i,
        });
    }
    console.timeEnd('Fill the tree [ O(n) operation ]')

    //The tree contains value X?
    console.time('Contains [ O(log(n)) operation ]');
    const search = {
        hashTag: "Dummy text ",
        count: 49999999
    }
    console.log("Contains the value " + search.count + " : " + tree.contains(search, tree.root))
    console.timeEnd('Contains [ O(log(n)) operation ]')

    //Get 2 maximum values 
    console.time('Get top 2 [ O(log(n)) operation ]');
    console.log("Top 2 maximum values: ")
    let result = tree.getTop2()
    console.log(result[0])
    console.log(result[1])
    console.timeEnd('Get top 2 [ O(log(n)) operation ]')

    //Remove an element
    console.time('Remove an element [ O(log(n)) operation ]');
    tree.remove({
        hashTag: 'Prueba',
        count: 49999999
    })
    console.timeEnd('Remove an element [ O(log(n)) operation ]');
}
*/