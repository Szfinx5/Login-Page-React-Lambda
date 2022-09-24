import replyMessage from "./functions/response";
import register from "./models/register";

export async function handler(event) {
  console.log("Event", event);
  let response = {};

  switch (true) {
    case event.httpMethod === "GET" && event.path === "/user":
      response = replyMessage(200, event.path);
      break;
    case event.httpMethod === "DELETE" && event.path === "/user":
      response = replyMessage(201, event.path);
      break;
    case event.httpMethod === "POST" && event.path === "/user/login":
      const loginBody = JSON.parse(event.body);
      response = await login(loginBody);
      break;
    case event.httpMethod === "POST" && event.path === "/user/register":
      const registerBody = JSON.parse(event.body);
      response = await register(registerBody);
      break;
    default:
      response = replyMessage(404, "404 Not Found");
  }
  return response;
}
