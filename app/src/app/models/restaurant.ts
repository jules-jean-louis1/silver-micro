import { DataTypes } from "sequelize";
import sequelize from "../api/config";

export const Restaurant = sequelize.define(
  "restaurant",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    close_monday: {
      type: DataTypes.BOOLEAN,
    },
    close_tuesday: {
      type: DataTypes.BOOLEAN,
    },
    opening_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    closing_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
