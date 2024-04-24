import { DataTypes } from "sequelize";
import sequelize from "../api/config";
import { CookingTypeRestaurant } from "./cooking_type_restaurant";

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

CookingType.belongsToMany(CookingTypeRestaurant, {
  through: CookingTypeRestaurant,
  foreignKey: "cooking_type_id",
});