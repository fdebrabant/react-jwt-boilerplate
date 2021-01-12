import { React, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Form = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.div`
  width: 100px;
  height: 20px;
  background-color: #dedede;
  margin: 10px auto;
  border-radius: 5px;
  text-align: center;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // appel de la base de donnée

  const handleSubmit = () => {
    const { REACT_APP_SERVER_ADDRESS } = process.env;
    if (email && password) {
      axios
        .post(`${REACT_APP_SERVER_ADDRESS}/login/`, {
          email,
          password,
        })
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          localStorage.setItem("TOKEN", data.token);
          // stockage du JTW dans le local storage
          alert("Vous etes connecté");
        })
        .catch((error) => {
          alert(error.response.data.errorMessage);
        });
    } else {
      alert("Les champs ne sont pas renseignés");
    }
  };

  return (
    <div>
      <Form>
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            value={email}
            placeholder="janeDoe@email.com"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password{" "}
          <input
            type="text"
            id="password"
            value={password}
            placeholder="**********"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </Form>
      <Button onClick={handleSubmit}>Connexion</Button>
    </div>
  );
};

export default Login;
