import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotelController.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/find/:id", getHotel);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

router.get("/room/:id", getHotelRooms);

router.route("/").post(verifyAdmin, createHotel).get(getHotels);
router
  .route("/:id")
  .put(verifyAdmin, updateHotel)
  .delete(verifyAdmin, deleteHotel);

export default router;
