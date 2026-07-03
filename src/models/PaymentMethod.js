import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const PaymentMethod = sequelize.define("Payments", {
  paymentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default PaymentMethod;