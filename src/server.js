import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";

import userRoutes from "./routes/userRoute.js";
import loginRoutes from "./routes/loginRoute.js";

import serviceRoutes from "./routes/serviceRoute.js";

import paymentRoutes from "./routes/paymentRoute.js";

import "./models/Users.js";
import "./models/Services.js";
import "./models/PaymentMethod.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

// Routes
app.use("/api", userRoutes);
app.use("/api", loginRoutes);

app.use("/api", serviceRoutes);

app.use("/api", paymentRoutes);

// Database connection
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");

    await sequelize.sync();
    // await sequelize.sync({ alter: true });
    console.log("Models synced!");

    app.listen(PORT, () => console.log(`Server running on port. ${PORT}`));
  } catch (error) {
    console.error("DB connection failed!!:", error);
  }
};

start();