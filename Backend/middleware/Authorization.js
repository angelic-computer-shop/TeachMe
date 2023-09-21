// Create a middleware for token authentication
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Missing or invalid token" });
  }

  next();
};

export default authenticateToken;