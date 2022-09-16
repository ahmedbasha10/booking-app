import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/:hotelId", createRoom);
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

router.route("/:id").put(verifyAdmin, updateRoom).get(getRoom);

router.route("/").get(getRooms);

export default router;
