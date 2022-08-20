import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authentificated!"));
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(401, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user)
      return next(createError(401, "You are not authentificated!"));
    if (req.user.id === req.params.id || req.user.isAdmin) next();
    else return next(createError(401, "You are not authorized!"));
  });
};

// probleme si user nest pas admin if adding next
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user)
      return next(createError(401, "You are not authentificated!"));
    if (req.user.isAdmin) next();
    else return next(createError(401, "You are not authorized!"));
  });
};
