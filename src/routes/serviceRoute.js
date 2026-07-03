import express from "express";
import { createService, getAllServices, deleteService, updateService } from "../controllers/servicesController.js";
// import { validate } from "../middleware/validate.js";
// import { loginSchema } from "../validation/userValidation.js";

const router = express.Router();

router.post("/createService", createService);
router.get("/all-services", getAllServices);
router.delete("/delete-service/:id", deleteService);
router.put("/update-service/:id", updateService);

export default router;
