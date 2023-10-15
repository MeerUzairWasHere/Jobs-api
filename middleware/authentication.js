const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  //keep space after bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
