import React from "react";
import New, { NewProps } from "./New";
import "../styles/NewsSection.css";
import { db } from "../App";

const NewsSection: React.SFC = () => {
  const [news, setNews] = React.useState<firebase.firestore.DocumentData[]>();

  React.useEffect(() => {
    const fetchData = async () => {
      db.collection("news").onSnapshot(doc => {
        setNews(doc.docs.map(doc => doc.data()));
      });
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-7">
          <div className="container-fluid">
            <h3 className="text-weight-bold">Publicaciones</h3>
            {news?.map(el => {
              console.log(el);

              return (
                <New
                  key={el.id}
                  userName={el.userName}
                  userDescription={el.userDescription}
                  newDescription={el.newDescription}
                  comments={el.comments}
                ></New>
              );
            })}

            <footer>
              <small>Desarrollado con ♥ por: Angel Mateo Gonzalez ✈</small>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsSection;
