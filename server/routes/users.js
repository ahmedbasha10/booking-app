import express from "express";

import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/check", verifyToken, (req, res, next) => {
  res.send("authenticated");
});

router.get("/checkUser/:id", verifyUser, (req, res, next) => {
  res.send("user checked");
});

router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
  res.send("you are admin");
});

router.route("/").get(verifyAdmin, getUsers);
router
  .route("/:id")
  .put(verifyUser, updateUser)
  .delete(verifyUser, deleteUser)
  .get(verifyUser, getUser);

export default router;
