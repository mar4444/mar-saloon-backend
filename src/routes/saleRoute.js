import express from "express";
import { createSale, getSales, reportPerBarber, dailyReport } from "../controllers/saleController.js";

const router = express.Router();

router.post("/create-sale", createSale);
router.get("/all-sales", getSales);
router.get("/report/barber", reportPerBarber);
router.get("/report/daily-report", dailyReport);
// router.delete("/delete-service/:id", deleteService);
// router.put("/update-service/:id", updateService);

export default router;
