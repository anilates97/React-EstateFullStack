import express from "express";
import {
  bookVisit,
  cancelBooking,
  createUser,
  favBookings,
  getAllBookings,
  getAllFav,
} from "../controllers/userController.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/allBookings/", getAllBookings);
router.post("/removeBooking/:id", cancelBooking);
router.post("/myFavourites/:residencyId", favBookings);
router.post("/allFav", getAllFav);

export { router as userRoute };
