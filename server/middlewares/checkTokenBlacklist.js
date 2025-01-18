const jwt = require("jsonwebtoken");
const redisClient = require("../redisClient");

const checkTokenBlacklist = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header is missing or invalid." });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  try {
    // Check if the token is in Redis blacklist
    const isBlacklisted = await redisClient.get(token);

    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Token is invalid or blacklisted." });
    }

    // Verify the token and attach payload to the request
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next(); // Proceed to the next middleware/route
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token or not authorized." });
  }
};

module.exports = checkTokenBlacklist;
