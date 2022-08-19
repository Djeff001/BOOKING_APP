import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// CHECK AUTH
router.get("/checkAuthentification", verifyToken, (req, res, next) => {
  res.send("Hello user you are logged in");
});
// CHECK USER
router.get("/checkUser/:id", verifyUser, (req, res, next) => {
  res.send("Hello user you are logged in and you can delete your account");
});
// CHECK ADMIN
router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
  res.send("Hello admin you are logged in and you can delete all accounts");
});

// UPDATE
router.put("/:id", verifyUser, updateUser);
// DELETE
router.delete("/:id", verifyUser, deleteUser);
// GET
router.get("/:id", verifyUser, getUser);
// GET ALL
router.get("/", verifyAdmin, getAllUsers);

export default router;
