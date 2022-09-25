import replyMessage from "../functions/response";
import { veryfyToken } from "../functions/token.js";

function verify(request) {
  if (!request.user || !request.user.email || !request.token) {
    return replyMessage(401, {
      verified: false,
      message: "Incorrect request",
    });
  }

  const user = request.user;
  const token = request.token;

  const checkingToken = veryfyToken(user.email, token);

  if (!checkingToken.verified) {
    return replyMessage(401, checkingToken);
  }

  return replyMessage(200, {
    verified: true,
    message: checkingToken.message,
    user: user,
    token: token,
  });
}

export default verify;
