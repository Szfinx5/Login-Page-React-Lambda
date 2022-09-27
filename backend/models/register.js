import AWS from "aws-sdk";
import bcrypt from "bcryptjs";
import replyMessage from "../functions/response.js";
import getUser from "../functions/user.js";

AWS.config.update({ region: "eu-west-1" });

const documentClient = new AWS.DynamoDB.DocumentClient();

// This function handles the registration
async function register(userData) {
  if (!userData.password || !userData.name || !userData.email) {
    console.log(replyMessage(401, { message: "Please complete every fields" }));
    return replyMessage(401, { message: "Please complete every fields" });
  }

  // If the correct data was received, we trim the white spaces
  // and convert the username to lowercase
  const password = userData.password.trim();
  const name = userData.name.trim();
  const email = userData.email.trim().toLowerCase();

  // Checking if the username (email) was already registered
  const isAvailableUser = await getUser(email);
  if (isAvailableUser && isAvailableUser.email) {
    console.log(
      replyMessage(401, { message: "Email address is already registered" })
    );
    return replyMessage(401, {
      message: "Email address is already registered",
    });
  }

  // If everything went alright, the user object is created for the table
  const encryptedPassword = bcrypt.hashSync(password, 10);
  const user = {
    password: encryptedPassword,
    name: name,
    email: email,
  };

  // Saving the user to the table
  // and returning the result
  const postUserResponse = await postUser(user);
  if (!postUserResponse) {
    return replyMessage(500, {
      message: "Server error. Please try again later.",
    });
  }
  console.log(replyMessage(200, { message: name }));
  return replyMessage(200, { message: name });
}

// The function itself which will interract with the DynamoTable
async function postUser(user) {
  const params = {
    TableName: "cromwell",
    Item: user,
  };

  try {
    const data = await documentClient.put(params).promise();
    return true;
  } catch (error) {
    return "There was an error adding the user: ", error;
  }
}

// register({
//   username: "Bella",
//   password: "password",
//   firstname: "Ala",
//   surename: "Dar",
//   email: "ala@dar.com",
// });

export default register;
