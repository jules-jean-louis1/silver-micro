import { DataTypes } from "sequelize";
import sequelize from "../api/config";
import { Restaurant } from "./restaurant";
import { City } from "./city";

export const CityRestaurant = sequelize.define(
  "city_restaurant",
  {
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Restaurant,
        key: "id",
      },
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: City,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
