import AWS from "aws-sdk";
import bcrypt from "bcryptjs";
import replyMessage from "../functions/response.js";
import getUser from "../functions/user.js";

AWS.config.update({ region: "eu-west-1" });

const documentClient = new AWS.DynamoDB.DocumentClient();

async function register(userData) {
  if (
    !userData.username ||
    !userData.password ||
    !userData.firstname ||
    !userData.surename ||
    !userData.email
  ) {
    // return replyMessage(401, { message: "Please complete every fields" });
    return console.log(
      replyMessage(401, { message: "Please complete every fields" })
    );
  }

  const userName = userData.username.trim().toLowerCase();
  const password = userData.password.trim();
  const firstName = userData.firstname.trim();
  const sureName = userData.surename.trim();
  const email = userData.email.trim();

  const isAvailableUser = await getUser(userName);
  console.log(isAvailableUser);
  console.log(userName);
  if (isAvailableUser && isAvailableUser.username) {
    // return replyMessage(401, { message: "Username is already taken" });
    return console.log(
      replyMessage(401, { message: "Username is already taken" })
    );
  }

  const encryptedPassword = bcrypt.hashSync(password, 10);
  const user = {
    username: userName,
    password: encryptedPassword,
    firstname: firstName,
    surename: sureName,
    email: email,
  };

  const postUserResponse = await postUser(user);
  if (!postUserResponse) {
    return replyMessage(500, {
      message: "Server error. Please try again later.",
    });
  }
  //   return replyMessage(200, { message: userName });
  return console.log(replyMessage(200, { message: userName }));
}

async function postUser(user) {
  const params = {
    TableName: "cromwell-users",
    Item: user,
  };

  try {
    const data = await documentClient.put(params).promise();
    return true;
  } catch (error) {
    return "There was an error adding the user: ", error;
  }
}

register({
  username: "Bella",
  password: "password",
  firstname: "Ala",
  surename: "Dar",
  email: "ala@dar.com",
});

export default register;
