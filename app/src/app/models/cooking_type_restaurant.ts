import { DataTypes } from "sequelize";
import sequelize from "../api/config";
import { Restaurant } from "./restaurant";
import { CookingType } from "./cooking_type";

export const CookingTypeRestaurant = sequelize.define(
    "cooking_type_restaurant",
    {
        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Restaurant,
                key: "id",
            },
        },
        cooking_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: CookingType,
                key: "id",
            },
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);