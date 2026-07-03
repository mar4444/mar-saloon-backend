import express from "express";
import { registerUser, getUsers, deleteUser } from "../controllers/userController.js";
import { validate } from "../middleware/validate.js";
import { registerSchema } from "../validation/userValidation.js";

import role from "../middleware/roleMiddleware.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.get("/allUsers", auth, role("admin"), getUsers);
router.delete("/deleteUser/:id", deleteUser);

export default router;