import jwt from "jsonwebtoken";

function getToken(user) {
  const userData = {
    username: user.username,
    email: user.email,
  };

  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "1h" });
}

export function veryfyToken(username, token) {
  return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
    if (error) {
      return {
        verified: false,
        message: "invalid token",
      };
    }
    if (response.username != username) {
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
