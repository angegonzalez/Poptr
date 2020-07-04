import React from "react";
import firebase from "firebase";
import { db } from "../App";
import LandingNew from "./LandingNew";

export interface LandingNewsSectionProps {}

const LandingNewsSection: React.SFC<LandingNewsSectionProps> = () => {
  const [landingNews, setLandingNews] = React.useState<
    firebase.firestore.DocumentData[]
  >([]);

  React.useEffect(() => {
    const fetchData = async () => {
      db.collection("landing-news")
        .orderBy("timeAgo")
        .get()
        .then((user) => {
          const data = user.docs.map((doc) => doc.data());
          setLandingNews(data);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="ml-3">
      {landingNews.map((notice, index) => {
        return (
          <LandingNew
            key={index}
            name={notice.name}
            description={notice.description}
            photo={notice.photo}
            timeAgo={notice.timeAgo}
          ></LandingNew>
        );
      })}
    </div>
  );
};

export default LandingNewsSection;
