import React from "react";
import "../styles/TransactionSection.css";
import Transaction from "./Transaction";
import { db } from "../App";
export interface TransactionSectionProps {}

const TransactionSection: React.SFC<TransactionSectionProps> = () => {
  const [transactions, setTransactions] = React.useState<
    firebase.firestore.DocumentData[]
  >();

  React.useEffect(() => {
    const fetchData = async () => {
      db.collection("transactions").onSnapshot((doc) => {
        const data = doc.docs.map((doc) => doc.data());
        for (let i = 0; i < data.length; i += 1) {
          Object.defineProperty(data[i], "id", {
            value: doc.docs[i].id,
          });
        }
        setTransactions(data);
      });
    };
    fetchData();
  }, []);

  return (
    <div className="row mb-3 mr-2 ml-2">
      <div className="col-md-6 col-sm-10 col-lg-6 mt-2">
        <div className="container-fluid transaction-section">
          <h5 className="mb-3">Estos son los trámites que puedes hacer</h5>
          {transactions?.map((trans) => {
            return (
              <Transaction
                key={trans.id}
                transactionName={trans.transactionName}
                companyName={trans.companyName}
                campus={trans.campus}
                campusLocation={trans.campusLocation}
                transactionDescription={trans.transactionDescription}
                imgPlace={trans.imgPlace}
                documents={trans.documents}
              ></Transaction>
            );
          })}
        </div>
      </div>

      <div className="col-md-6 col-sm-10 col-lg-6 mt-2">
        <div className="container-fluid transaction-section"></div>
      </div>
    </div>
  );
};

export default TransactionSection;
