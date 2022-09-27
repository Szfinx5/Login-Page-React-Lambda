import replyMessage from "./functions/response";
import register from "./models/register";
import verify from "./models/verify";

export async function handler(event) {
  console.log("Event", event);
  let response = {};

  // Depending on the request time and the path,
  // different functions will be called.
  // The GET function was removed as GETing the user details were combined with the Verify path
  // The Delete function would work, but not active as it is not implemented on the frontend
  switch (true) {
    // case event.httpMethod === "GET" && event.path === "/user":
    //   response = replyMessage(200, event.path);
    //   break;
    // case event.httpMethod === "DELETE" && event.path === "/user":
    //   response = replyMessage(201, event.path);
    //   break;
    case event.httpMethod === "POST" && event.path === "/user/login":
      const loginBody = JSON.parse(event.body);
      response = await login(loginBody);
      break;
    case event.httpMethod === "POST" && event.path === "/user/register":
      const registerBody = JSON.parse(event.body);
      response = await register(registerBody);
      break;
    case event.httpMethod === "POST" && event.path === "/user/verify":
      const verifyBody = JSON.parse(event.body);
      response = await verify(verifyBody);
      break;
    default:
      response = replyMessage(404, "404 Not Found");
  }
  return response;
}
