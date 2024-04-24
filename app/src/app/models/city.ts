import { DataTypes } from "sequelize";
import sequelize from "../api/config";
import { CityRestaurant } from "./city_restaurant";

export const City = sequelize.define(
  "city",
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

City.belongsToMany(CityRestaurant, {
  through: CityRestaurant,
  foreignKey: "city_id",
});