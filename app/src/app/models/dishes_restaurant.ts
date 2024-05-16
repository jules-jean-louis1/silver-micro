import { DataTypes } from "sequelize";
import sequelize from "../api/config";
import { Dishes } from "./dishes";
import { Restaurant } from "./restaurant";

export const DishesRestaurant = sequelize.define(
    "dishes_restaurant",
    {
        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Restaurant,
                key: "id",
            },
        },
        dishes_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Dishes,
                key: "id",
            },
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);