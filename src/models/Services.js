import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Service = sequelize.define("Services", {
  serviceName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Service;
