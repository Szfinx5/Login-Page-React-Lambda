import jwt from "jsonwebtoken";

function getToken(user) {
  const userData = {
    username: user.username,
    email: user.email,
  };

  return jwt.sign(userData, "cromwell", { expiresIn: "1h" });
}

export default getToken;
