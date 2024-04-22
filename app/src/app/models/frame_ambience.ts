import { DataTypes } from "sequelize";
import sequelize from "../api/config";

export const FrameAmbience = sequelize.define(
  "frame_ambience",
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