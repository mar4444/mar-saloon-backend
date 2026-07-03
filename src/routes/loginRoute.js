import express from "express";
import { loginUser } from "../controllers/loginController.js";
import { validate } from "../middleware/validate.js";
import { loginSchema } from "../validation/userValidation.js";

const router = express.Router();

router.post("/login", validate(loginSchema), loginUser);

export default router;
