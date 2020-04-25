import * as React from "react";
import "../styles/Users.css";
import User from "./User";
import { db } from "../App";
export interface UserSectionProps {}

const UserSection: React.SFC<UserSectionProps> = () => {
  const [users, setUsers] = React.useState<firebase.firestore.DocumentData[]>();
  React.useEffect(() => {
    const fetchData = async () => {
      db.collection("users").onSnapshot((user) => {
        const data = user.docs.map((doc) => doc.data());
        for (let i = 0; i < data.length; i += 1) {
          Object.defineProperty(data[i], "id", {
            value: user.docs[i].id,
          });
        }
        setUsers(data);
      });
    };
    fetchData();
  }, []);
  return (
    <div className="user-card mb-4" style={{ padding: "1rem" }}>
      <h5 className="mb-2">Usuarios</h5>
      {users?.map((us) => {
        return (
          <User
            key={us.id}
            user={us.user}
            userDescription={us.userDescription}
            userName={us.userName}
            userPhoto={us.userPhoto}
          />
        );
      })}
      <footer>
        <small>Busca un usuario en: Perfil </small>
      </footer>
    </div>
  );
};

export default UserSection;
