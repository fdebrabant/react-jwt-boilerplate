import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const { REACT_APP_SERVER_ADDRESS } = process.env;
    // recuperation du jtw a partir du localstorage
    const token = localStorage.getItem("TOKEN");
    // appel a la BDD
    axios
      .get(`${REACT_APP_SERVER_ADDRESS}/users`, {
        // appel header du jtw (header /payload /signature)
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        let message;
        if (err.response.status === 401) {
          message = "Vous n'avez pas acces a ces donnees connectez vous";
        } else {
          message = err.response.data.errorMessage;
        }
        alert(message);
        console.error(err);
      });
  }, []);

  // creation liste des users identifiés
  return (
    <div>
      <p>Liste des utilisateurs connectés</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id} - email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
