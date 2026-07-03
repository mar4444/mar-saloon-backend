import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("Users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  role: {
    type: DataTypes.ENUM(
      "barber",
      "Receptionist",
      "admin"
    ),
    allowNull: false,
    defaultValue: "barber",
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
