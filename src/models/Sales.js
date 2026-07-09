import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Sales = sequelize.define("Sales", {
  barberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  paymentMethodId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  amountPaid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  paymentStatus: {
    type: DataTypes.ENUM("PENDING", "PAID"),
    allowNull: false,
    defaultValue: "PENDING",
  },
});

export default Sales;
