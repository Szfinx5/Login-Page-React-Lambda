import jwt from "jsonwebtoken";

function getToken(user) {
  const userData = {
    name: user.name,
    email: user.email,
  };

  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "1h" });
}

export function veryfyToken(email, token) {
  return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
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
