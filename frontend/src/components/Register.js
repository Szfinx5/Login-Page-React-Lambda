import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const account = { name, email, password };
    setIsLoading(true);
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(account),
    }).then(() => {
      console.log("Successfully registered");
      setIsLoading(false);
      history("/profile");
    });
  }

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label>Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <label>Confirm password:</label>
        <input
          type="password"
          required
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
        ></input>

        <label>Email address:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        {!isLoading && <button>Register</button>}
        {isLoading && <button disabled>Registering...</button>}
        {/* <p>{title}</p>
        <p>{text}</p>
        <p>{author}</p> */}
      </form>
    </div>
  );
}

export default Register;
