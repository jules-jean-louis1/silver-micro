import { DataTypes } from "sequelize";
import sequelize from "../api/config";
import { Customer } from "./customer";
import { Review } from "./review";

export const Reply = sequelize.define(
  "reply",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Review,
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
