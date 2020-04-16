import React from "react";

export interface TransactionProps {}

const Transaction: React.SFC<TransactionProps> = () => {
  return (
    <>
      <div className="card mb-3 mt-4">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src="https://image.freepik.com/foto-gratis/moderno-edificio-negocios-pared-vidrio-piso-vacio_1127-2865.jpg" className="card-img"/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
