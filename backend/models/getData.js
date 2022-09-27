import AWS from "aws-sdk";
import replyMessage from "../functions/response.js";
import { veryfyToken } from "../functions/token.js";
import getUser from "../functions/user.js";

AWS.config.update({ region: "eu-west-1" });

const documentClient = new AWS.DynamoDB.DocumentClient();

// This function will check if the token is valid.
// If it is, querying the table for the requested user's data and return it to the frontend
async function getData(userData) {
  if (!userData.token) {
    console.log(replyMessage(401, { message: "Unauhorized access" }));
    return replyMessage(401, { message: "Unauhorized access" });
  }

  const user = userData.user;
  const token = userData.token;

  // Checking if the token is valid
  const checkingToken = veryfyToken(user, token);
  if (checkingToken.verified) {
    //If valid, then the details of the user will be requested
    const validUser = await getUser(user);
    const response = {
      name: validUser.name,
      email: validUser.email,
      password: validUser.password,
      token: token,
    };
    console.log(replyMessage(200, response));
    return replyMessage(200, response);
  }

  return replyMessage(401, checkingToken);
}

get({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IiLCJlbWFpbCI6ImVlQGVlLmVlIiwiaWF0IjoxNjY0MTk5MjY0LCJleHAiOjE2NjQyMDI4NjR9._0EWgq9j_9_Xk9bFyhbFQVE0UY4nWsSxn6V0WagLZi0",
});
export default getData;
