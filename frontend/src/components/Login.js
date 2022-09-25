import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const account = { email, password };
    // console.log(JSON.stringify(account));
    setIsLoading(true);
    const response = await fetch(
      "https://t1rs7h1mc5.execute-api.eu-west-1.amazonaws.com/prod/user/login",
      {
        method: "POST",
        body: JSON.stringify(account),
        headers: {
          "x-api-key": "NLTDNyfByD5rr9EdmpA5Ua1TkTGB8FRb1FNgGCGV",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    const body = await response.json();
    console.log(body);
    if (response.ok) {
      history("/profile");
    } else {
      setError(body.message);
    }

    setIsLoading(false);
  }
  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email address:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label>Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {!isLoading && <button>Login</button>}
        {isLoading && <button disabled>Please wait...</button>}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
