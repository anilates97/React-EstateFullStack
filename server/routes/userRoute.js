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

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id", jwtCheck, bookVisit);
router.post("/allBookings/", getAllBookings);
router.post("/removeBooking/:id", jwtCheck, cancelBooking);
router.post("/myFavorites/:residencyId", jwtCheck, favBookings);
router.post("/allFav", jwtCheck, getAllFav);

export { router as userRoute };
