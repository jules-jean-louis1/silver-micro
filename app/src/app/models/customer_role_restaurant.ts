import { DataTypes } from "sequelize";
import sequelize from "../api/config";
import { Customer } from "./customer";
import { Restaurant } from "./restaurant";

export const CustomerRole = sequelize.define(
  "customer_role_restaurant",
  {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "id",
      },
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Restaurant,
        key: "id",
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);