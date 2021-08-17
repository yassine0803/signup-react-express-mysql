import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const secret = "test";
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
