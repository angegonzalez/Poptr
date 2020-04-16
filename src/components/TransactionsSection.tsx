import React from "react";
import "../styles/TransactionSection.css";
import Transaction from "./Transaction";

export interface TransactionSectionProps {}

const TransactionSection: React.SFC<TransactionSectionProps> = () => {
  return (
    <div className="row mb-3 mr-2 ml-2">
      <div className="col-md-6 col-sm-10 col-lg-6 mt-2">
        <div className="container-fluid transaction-section">
          <h2 className="mb-3" style={{ textAlign: "center" }}>
            Trámites
          </h2>
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
        </div>
      </div>

      <div className="col-md-6 col-sm-10 col-lg-6 mt-2">
        <div className="container-fluid transaction-section">
          <Transaction />
        </div>
      </div>
    </div>
  );
};

export default TransactionSection;
