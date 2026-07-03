import express from "express";
import { createPayment, getAllPayments, deletePayment, updatePayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/createPayment", createPayment);
router.get("/all-payment", getAllPayments);
router.delete("/delete-payment/:id", deletePayment);
router.put("/update-payment/:id", updatePayment);

export default router;
