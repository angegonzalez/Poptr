import React from "react";
import "../styles/TransactionSection.css";
import Transaction, { TransactionProps } from "./Transaction";
import { db } from "../App";
import { PriorityQueue } from "../classes/PriorityQueue";
import Turns from "./Turns";

export interface TransactionSectionProps {}




const TransactionSection: React.SFC<TransactionSectionProps> = () => {
  const [transactions, setTransactions] = React.useState<
    firebase.firestore.DocumentData[]
  >([]);
  const [doRender, setdoRender] = React.useState(0)
  React.useEffect(() => {
    const fetchData = async () => {
      db.collection("transactions")
        .get()
        .then((doc) => {
          const data = doc.docs.map((doc) => doc.data());
          for (let i = 0; i < data.length; i += 1) {
            Object.defineProperty(data[i], "id", {
              value: doc.docs[i].id,
            });
          }
          setTransactions(data);
        });
    };
    if (transactions.length === 0) fetchData();
  }, []);

  return (
    <div className="row mb-3 mr-2 ml-2">
      <div className="col-md-6 col-sm-10 col-lg-6 mt-2">
        <div className="container-fluid transaction-section">
          <h5 className="mb-3">Estos son los trámites que puedes hacer</h5>
          {transactions.length !== 0
            ? transactions.map((trans) => {
                return (
                  <Transaction
                    key={trans.id}
                    transactionId={trans.id}
                    transactionName={trans.transactionName}
                    companyName={trans.companyName}
                    campus={trans.campus}
                    campusLocation={trans.campusLocation}
                    transactionDescription={trans.transactionDescription}
                    imgPlace={trans.imgPlace}
                    documents={trans.documents}
                    priority= {trans.priority}
                    isinQueue={false}
                  ></Transaction>
                );
              })
            : null}
        </div>
      </div>
      <div className="col-md-6 col-sm-10 col-lg-4 mt-2">
        <div className="container-fluid transaction-section">
          <Turns></Turns>
        </div>
      </div>
    </div>
  );
};

export default TransactionSection;
