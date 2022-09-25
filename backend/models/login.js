import AWS from "aws-sdk";
import bcrypt from "bcryptjs";
import replyMessage from "../functions/response.js";
import getToken from "../functions/token.js";
import getUser from "../functions/user.js";

AWS.config.update({ region: "eu-west-1" });

const documentClient = new AWS.DynamoDB.DocumentClient();

async function login(userData) {
  if (!userData.username || !userData.password) {
    return replyMessage(401, { message: "Username or password is missing" });
  }

  const userName = userData.username.trim().toLowerCase();
  const password = userData.password.trim();

  const validUser = await getUser(userName);
  if (
    !validUser ||
    !validUser.username ||
    !bcrypt.compareSync(password, validUser.password)
  ) {
    return replyMessage(404, { message: "Username or password is incorrect" });
  }
  const user = {
    username: validUser.username,
    firstname: validUser.firstname,
    surename: validUser.surename,
    email: validUser.email,
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
