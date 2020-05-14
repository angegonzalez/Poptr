import React from "react";
import "../styles/Transaction.css";
import Modal from "react-bootstrap/Modal";
export interface TransactionProps {
  transactionName: string;
  companyName: string;
  campus: string;
  campusLocation: string;
  transactionDescription: string;
  imgPlace: string;
  documents: string[];
}

const Transaction: React.SFC<TransactionProps> = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <div className="card mb-3 mt-4">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={props.imgPlace} className="card-img" />
          </div>
          <div className="col-md-6">
            <div className="card-body mb-0 ">
              <h5 className="card-title ">{props.transactionName}</h5>
              <p className="font-weight-bold mb-0">{props.companyName}</p>
              <p className="font-weight-light mb-0">
                {props.campus} · {props.campusLocation}
              </p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="card-body">
              <div className="row">
                <button
                  type="button"
                  className="btn btn-outline-dark btn-block"
                  onClick={() => setShowModal(true)}
                >
                  Info.
                </button>
                <Modal
                  show={showModal}
                  onHide={() => setShowModal(false)}
                  animation={false}
                  centered
                >
                  <Modal.Header closeButton style={{ alignItems: "center" }}>
                    <Modal.Title>{props.transactionName}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="mb-0">{props.transactionDescription}</p>
                    <p className="font-weight-bold">
                      Los documentos que necesitas en este trámite son:{" "}
                    </p>
                    <ul className="list-group">
                      {props.documents.map((doc, index) => {
                        return (
                          <li className="mb-0 list-group-item" key={index}>
                            {doc}
                          </li>
                        );
                      })}
                    </ul>
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                </Modal>
              </div>
              <div className="row mt-2">
                <button type="button" className="btn btn-dark btn-block">
                  Agendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
