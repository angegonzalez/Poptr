import React from "react";
import { db } from "../App";
import firebase from "firebase";
import { PriorityQueue } from "../classes/PriorityQueue";
import Turn from "./Turn";
import Button from "./Button";

export interface TurnsProps {}

const Turns: React.SFC<TurnsProps> = () => {
  const loggedUser = firebase.auth().currentUser!.email;
  const [turns, setturns] = React.useState(new PriorityQueue<any>());
  const [user, setuser] = React.useState("");
  React.useEffect(() => {
    const fetchData = async () => {
      let userId = "";

      db.collection("users")
        .where("user", "==", loggedUser)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            userId = doc.id;
          });
          setuser(userId);
        });
      db.collection("users")
        .where("user", "==", loggedUser)
        .get()
        .then((doc) => {
          const data = doc.docs.map((doc) => doc.data());
          const myTurns: any[] = data[0].transactions;
          const myPriorityQueue = new PriorityQueue();

          myTurns.map((transaction) => {
            myPriorityQueue.insert(transaction);
          });

          setturns(myPriorityQueue);
        });
    };
    fetchData();
  });

  const updateTime = () => {
    let data: any[] = [];

    db.collection("users")
      .where("user", "==", loggedUser)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data = doc.data().transactions;
        });
        if (data.length > 0) {
          data.sort((a, b) => {
            return b.priority - a.priority;
          });
          let iterations = data[0].priority;
          console.log(iterations);
          setTimeout(() => {
            if (iterations > 0) {
              updateAux();
              updateTime();
              iterations -= 1;
            }
          }, 1000);
        }
      });
  };

  const updateAux = () => {
    if (user) {
      const userRef = db.collection("users").doc(user);
      db.runTransaction((transaction) => {
        return transaction.get(userRef).then((doc) => {
          if (doc) {
            console.log(doc.data());
            if (doc.data()!.transactions.length > 0) {
              let myArray: any[] = doc.data()!.transactions;

              for (let i = 0; i < myArray.length; i++) {
                let transaction = myArray[i];
                transaction["priority"] = transaction.priority - 1;

                if (transaction["priority"] === 0) {
                  myArray.splice(i, 1);
                }
              }
              transaction.update(userRef, { transactions: myArray });
            }
          }
        });
      });
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-7">
            <div className="queue-card-title">
              <h4 className="mb-0">Cola de trámites</h4>
              <small className="mt-0">Empieza a gestionar tus trámites</small>
            </div>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-12">
            <div className="dequeue-button" style={{ marginRight: 10 }}>
              <Button
                name="Empezar"
                action={() => {
                  updateTime();
                }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="turns-wrapper mt-3">
            {turns.heap.map((turn, index) => {
              const data = turn.data;
              return (
                <Turn
                  campus={data.campus}
                  campusLocation={data.campusLocation}
                  imgPlace={data.imgPlace}
                  priority={data.priority}
                  transactionName={data.transactionName}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Turns;
