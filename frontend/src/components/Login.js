import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const account = { email, password };
    setIsLoading(true);
    // POST request for login
    const response = await fetch(
      "https://t1rs7h1mc5.execute-api.eu-west-1.amazonaws.com/prod/user/login",
      {
        method: "POST",
        body: JSON.stringify(account),
        headers: {
          "x-api-key": process.env.REACT_APP_HEADER,
          "Content-Type": "application/json",
        },
      }
    );
    const body = await response.json();

    // If the credetials were correct, the user is redirected to the profile page,
    // otherwise the returned error message will be displayed
    if (response.ok) {
      sessionStorage.setItem("user", body.user.email);
      sessionStorage.setItem("token", body.token);
      setIsLoggedIn(true);
      history(`/profile/`);
    } else {
      setError(body.message);
    }

    setIsLoading(false);
  }
  return (
    <div className="login">
      <h2>Login</h2>
      <p>Please enter your email and password to access your account.</p>
      <form onSubmit={handleSubmit}>
        <label>Email address:</label>
        <input
          type="email"
          // required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label>Password:</label>
        <input
          type="password"
          // required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {!isLoading && <button>Login</button>}
        {isLoading && <button disabled>Please wait...</button>}
        <div className="new-account">
          Haven't got an account yet?
          <br />
          <Link to="/register" className="register-link">
            Click here to register.
          </Link>
        </div>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
