import { DataTypes } from "sequelize";
import sequelize from "../api/config";
import { RestaurantMenu } from "./restaurant_menu";
import { RestaurantPhoto } from "./restaurant_photo";
import { CookingTypeRestaurant } from "./cooking_type_restaurant";
import { Customer } from "./customer";
import { CustomerRole } from "./customer_role_restaurant";
import { DishesRestaurant } from "./dishes_restaurant";
import { FrameAmbienceRestaurant } from "./frame_ambience_restaurant";
import { City } from "./city";
import { CityRestaurant } from "./city_restaurant";

export const Restaurant = sequelize.define(
  "restaurant",
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
    seat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    close_monday: {
      type: DataTypes.BOOLEAN,
    },
    close_tuesday: {
      type: DataTypes.BOOLEAN,
    },
    opening_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    closing_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Restaurant.belongsToMany(Customer, {
  through: CustomerRole,
  foreignKey: "restaurant_id",
});

Restaurant.belongsToMany(DishesRestaurant, {
  through: DishesRestaurant,
  foreignKey: "restaurant_id",
});

Restaurant.belongsToMany(CookingTypeRestaurant, {
  through: CookingTypeRestaurant,
  foreignKey: "restaurant_id",
});

Restaurant.hasMany(FrameAmbienceRestaurant, {
  through: FrameAmbienceRestaurant,
  foreignKey: "restaurant_id",
});

Restaurant.hasMany(RestaurantMenu, {
  through: RestaurantMenu,
  foreignKey: "restaurant_id",
});

Restaurant.hasMany(RestaurantPhoto, {
  through: RestaurantPhoto,
  foreignKey: "restaurant_id",
});

Restaurant.belongsToMany(City, {
  through: CityRestaurant,
  foreignKey: "restaurant_id",
});
