import { DataTypes } from "sequelize";
import sequelize from "../api/config";
import { DishesRestaurant } from "./dishes_restaurant";

export const Dishes = sequelize.define(
  "dishes",
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

Dishes.belongsToMany(DishesRestaurant, {
  through: DishesRestaurant,
  foreignKey: "dishes_id",
});