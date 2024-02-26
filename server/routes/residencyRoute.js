import express from "express";
import {
  createResidency,
  getAllResicencies,
  getResidency,
} from "../controllers/residencyController.js";

const router = express.Router();

router.post("/create", createResidency);
router.get("/allresd", getAllResicencies);
router.get("/:id", getResidency);

export { router as residencyRoute };
