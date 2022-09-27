import AWS from "aws-sdk";
import bcrypt from "bcryptjs";
import replyMessage from "../functions/response.js";
import getToken from "../functions/token.js";
import getUser from "../functions/user.js";

AWS.config.update({ region: "eu-west-1" });

const documentClient = new AWS.DynamoDB.DocumentClient();

// This function is handling the login request
async function login(userData) {
  if (!userData.email || !userData.password) {
    console.log(
      replyMessage(401, { message: "Username or password is missing" })
    );
    return replyMessage(401, { message: "Username or password is missing" });
  }

  const email = userData.email.trim().toLowerCase();
  const password = userData.password.trim();

  // After checking the table for the requested user, the function compare the password.
  // If it is not correct, or the user was not found in the table, an error message will be sent
  const validUser = await getUser(email);
  console.log(password);
  if (
    !validUser ||
    !validUser.email ||
    !bcrypt.compareSync(password, validUser.password)
  ) {
    console.log(
      replyMessage(404, { message: "Username or password is incorrect" })
    );
    return replyMessage(404, { message: "Username or password is incorrect" });
  }

  // If the all the details were correct, the user object will be built
  // from the data from the table and the received token
  const user = {
    name: validUser.name,
    email: validUser.email,
    password: validUser.password,
  };

  // Requesting a token
  const token = getToken(user);
  const response = {
    user: user,
    token: token,
  };
  console.log(replyMessage(200, response));
  return replyMessage(200, response);
}

login({
  email: "ala@dar.com",
  password: "Password44",
});

export default login;
