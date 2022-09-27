import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ isLoggedIn, setIsLoggedIn }) {
  const [user, setUser] = useState({});
  const history = useNavigate();

  // Checking if a token is present in the sessionStorage
  // if no, the user will be redirected to the login page
  // if there is a token a POST will be sent to verify the token. If it is valid the response will be the user details
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");

    if (!user || !token) {
      history(`/login`);
    } else {
      const account = { user, token };
      setIsLoggedIn(true);

      async function getUser(account) {
        const response = await fetch(
          `https://t1rs7h1mc5.execute-api.eu-west-1.amazonaws.com/prod/user/verify`,
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
        setUser(body);
      }
      getUser(account);
    }
  }, []);

  // When the Logout button is pressed, the sessionStorage will be cleared
  // and the user will be redirected to the login page
  function handleClick() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    history(`/login`);
  }

  // Rendering the details from the returned POST request
  return (
    <div className="profile">
      {!isLoggedIn && <h3>Please log in</h3>}
      {isLoggedIn && <h2>Name</h2>}
      {isLoggedIn && <p>{user.name}</p>}
      {isLoggedIn && <h2>Email address:</h2>}
      {isLoggedIn && <p>{user.email}</p>}
      {isLoggedIn && <h2>Token:</h2>}
      {isLoggedIn && <p>{user.token}</p>}

      <button onClick={handleClick}>Log out</button>
    </div>
  );
}

export default Profile;
