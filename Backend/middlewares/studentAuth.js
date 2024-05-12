const jwt = require("jsonwebtoken");

function studentAuthMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "authorization header is missing" });
  }
  if (token.split(" ").length != 2) {
    return res.status(400).json("Invalid token format use Bearer <token>");
  }
  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
      req.userId = decoded.userId;
      req.subjectId = decoded.subjectId;
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({ error: "Invalid token" });
    }
  } else {
    return res.status(401).json({ error: "Token not provided" });
  }
}

module.exports = studentAuthMiddleware;
