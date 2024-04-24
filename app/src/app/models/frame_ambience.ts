import { DataTypes } from "sequelize";
import sequelize from "../api/config";
import { FrameAmbienceRestaurant } from "./frame_ambience_restaurant";

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

FrameAmbience.belongsToMany(FrameAmbienceRestaurant, {
  through: FrameAmbienceRestaurant,
  foreignKey: "frame_ambience_id",
});