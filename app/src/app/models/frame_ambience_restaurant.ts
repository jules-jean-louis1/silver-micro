import { DataTypes } from "sequelize";
import sequelize from "../api/config";
import { Restaurant } from "./restaurant";
import { FrameAmbience } from "./frame_ambience";

export const FrameAmbienceRestaurant = sequelize.define(
    "frame_ambience_restaurant",
    {
        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Restaurant,
                key: "id",
            },
        },
        frame_ambience_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: FrameAmbience,
                key: "id",
            },
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);