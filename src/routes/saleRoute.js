import express from "express";
import { createSale, getSales } from "../controllers/saleController.js";

const router = express.Router();

router.post("/create-sale", createSale);
router.get("/all-sales", getSales);
// router.delete("/delete-service/:id", deleteService);
// router.put("/update-service/:id", updateService);

export default router;
