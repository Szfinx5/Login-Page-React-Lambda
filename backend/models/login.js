import AWS from "aws-sdk";
import bcrypt from "bcryptjs";
import replyMessage from "../functions/response.js";
import getToken from "../functions/token.js";
import getUser from "../functions/user.js";

AWS.config.update({ region: "eu-west-1" });

const documentClient = new AWS.DynamoDB.DocumentClient();

async function login(userData) {
  if (!userData.email || !userData.password) {
    return replyMessage(401, { message: "Username or password is missing" });
  }

  const email = userData.email.trim().toLowerCase();
  const password = userData.password.trim();

  const validUser = await getUser(email);
  if (
    !validUser ||
    !validUser.email ||
    !bcrypt.compareSync(password, validUser.password)
  ) {
    return replyMessage(404, { message: "Username or password is incorrect" });
  }
  const user = {
    name: validUser.name,
    email: validUser.email,
    password: validUser.password,
  };
  const token = getToken(user);
  const response = {
    user: user,
    token: token,
  };
  console.log(replyMessage(200, response));
  return replyMessage(200, response);
}

// login({ username: "bellla", password: "password" });

export default login;
