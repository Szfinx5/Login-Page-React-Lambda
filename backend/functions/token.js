import jwt from "jsonwebtoken";

// This function is generating a new token to the user
function getToken(user) {
  const userData = {
    name: user.name,
    email: user.email,
  };
  return jwt.sign(userData, "cromwell", { expiresIn: "1h" });
}

// Here we check if the token is valid.
export function veryfyToken(email, token) {
  return jwt.verify(token, "cromwell", (error, response) => {
    if (error) {
      return {
        verified: false,
        message: "invalid token",
      };
    }
    if (response.email != email) {
      return {
        verified: false,
        message: "invalid user",
      };
    }
    return {
      verified: true,
      message: "verified user",
    };
  });
}

export default getToken;
