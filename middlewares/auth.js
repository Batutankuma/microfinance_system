const jwt = require("jsonwebtoken");
const { errorMessage } = require("./message");

module.exports = (req, res, next) => {
  try {
    let keytoken = process.env.token_secret;
    let token = req.headers.auth;
    let decoded = jwt.verify(token, keytoken);
    let userId = decoded.user;
    if (!userId) {
      throw "Error token";
    } else {
        console.log(userId);
      next();
    }
  } catch (error) {
    errorMessage(res, error);
  }
};
