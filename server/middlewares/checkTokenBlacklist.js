const jwtHelper = require("../utils/jwtHelper"); // Import jwtHelper

const checkTokenBlacklist = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header is missing or invalid." });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  try {
    // Check if the token is blacklisted using jwtHelper
    const isBlacklisted = await jwtHelper.isTokenBlacklisted(token);

    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Token is invalid or blacklisted." });
    }

    // Verify the token and attach payload to the request using jwtHelper
    const decoded = jwtHelper.verifyAccessToken(token);
    req.user = decoded;

    next(); // Proceed to the next middleware/route
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token or not authorized." });
  }
};

module.exports = checkTokenBlacklist;
