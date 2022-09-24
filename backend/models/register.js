import AWS from "aws-sdk";
import replyMessage from "./response";
import bcrypt from "bcryptjs";

AWS.config.update({ region: "eu-west-1" });

const documentClient = new AWS.DynamoDB.DocumentClient();

async function register(userData) {
  const userName = userData.userName.trim().toLowerCase();
  const password = userData.password.trim();
  const firstName = userData.firstName.trim();
  const sureName = userData.sureName.trim();
  const email = userData.email.trim();

  if (!userName || !password || !firstName || !sureName || !email) {
    return replyMessage(401, { message: "Please complete every fields" });
  }

  const existingUser = await getUser(userName);
  if (existingUser && existingUser.username) {
    return replyMessage(401, { message: "Username is already taken" });
  }

  const encryptedPassword = bcrypt.hashSync(password, 10);
  const user = {
    username: userName,
    password: encryptedPassword,
    firstName: firstName,
    sureName: sureName,
    email: email,
  };

  const postUserResponse = await postUser(user);
  if (!postUserResponse) {
    return replyMessage(500, {
      message: "Server error. Please try again later.",
    });
  }
  return replyMessage(200, { message: userName });
}

async function getUser(userName) {
  const params = {
    TableName: "cromwell-users",
    Key: { username: userName },
  };
  try {
    const data = await documentClient.get(params).promise();
    return data.Items;
  } catch (error) {
    return "There was an error getting the user: ", error;
  }
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

export default register;
