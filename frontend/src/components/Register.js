import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    //Password validation
    function CheckPassword(password) {
      const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (password.match(passw)) {
        if (password === confPassword) {
          return true;
        } else setError("The password doesn't match");
        return false;
      } else {
        setError(
          `Password would needs to be between 6 to 20 characters which contain at least
           one numeric digit,
            one uppercase and
            one lowercase letter`
        );
        return false;
      }
    }

    // If the password, email address are in the correct format, the POST request will be sent for registration
    if (CheckPassword(password)) {
      const account = { name, email, password };
      setIsLoading(true);
      const response = await fetch(
        "https://t1rs7h1mc5.execute-api.eu-west-1.amazonaws.com/prod/user/register",
        {
          method: "POST",
          body: JSON.stringify(account),
          headers: {
            "x-api-key": "NLTDNyfByD5rr9EdmpA5Ua1TkTGB8FRb1FNgGCGV",
            "Content-Type": "application/json",
          },
        }
      );

      const body = await response.json();

      // Storing the received user information and token to the sessionStorage
      // and redirecting to the profile page
      if (response.ok) {
        sessionStorage.setItem("user", body.user.email);
        sessionStorage.setItem("token", body.token);
        history("/profile");
      } else {
        setError(body.message);
      }

      setIsLoading(false);
    }
  }

  return (
    <div className="register">
      <h2>Register</h2>
      <p>
        Please enter your email, password and your name to create your account.
      </p>
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
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Register;
