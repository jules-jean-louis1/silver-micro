import { DataTypes } from "sequelize";
import sequelize from "../api/config";
import { Restaurant } from "./restaurant";
import { Customer } from "./customer";

export const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    seat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Restaurant,
        key: "id",
      },
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
