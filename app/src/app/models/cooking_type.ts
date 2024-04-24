import { DataTypes } from "sequelize";
import sequelize from "../api/config";

export const CookingType = sequelize.define(
  "cooking_type",
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
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);