import { City } from "./city";
import { CityRestaurant } from "./city_restaurant";
import { CookingType } from "./cooking_type";
import { CookingTypeRestaurant } from "./cooking_type_restaurant";
import { Customer } from "./customer";
import { CustomerFavorite } from "./customer_favorite";
import { Dishes } from "./dishes";
import { DishesRestaurant } from "./dishes_restaurant";
import { FrameAmbience } from "./frame_ambience";
import { FrameAmbienceRestaurant } from "./frame_ambience_restaurant";
import { Restaurant } from "./restaurant";
import { RestaurantMenu } from "./restaurant_menu";
import { RestaurantPhoto } from "./restaurant_photo";
import { CustomerRole } from "./customer_role_restaurant";
import { Order } from "./order";

/* 
    RESTAURANT 
*/
Restaurant.belongsToMany(Customer, {
  through: CustomerRole,
  foreignKey: "restaurant_id",
  constraints: false,
});

Restaurant.belongsToMany(Dishes, {
  through: DishesRestaurant,
  foreignKey: "restaurant_id",
});

Restaurant.belongsToMany(CookingType, {
  through: CookingTypeRestaurant,
  foreignKey: "restaurant_id",
});

Restaurant.belongsToMany(FrameAmbience, {
  through: FrameAmbienceRestaurant,
  foreignKey: "restaurant_id",
});

Restaurant.hasMany(FrameAmbienceRestaurant, {
  foreignKey: "restaurant_id",
});

Restaurant.hasMany(RestaurantMenu, {
  foreignKey: "restaurant_id",
});

Restaurant.hasMany(RestaurantPhoto, {
  foreignKey: "restaurant_id",
});

Restaurant.belongsToMany(City, {
  through: CityRestaurant,
  foreignKey: "restaurant_id",
});
CustomerRole.belongsTo(Restaurant, { foreignKey: "restaurant_id" });
Restaurant.hasMany(Order, {
  foreignKey: "restaurant_id",
});
/*
  RESTAURANT_MENU
  */
RestaurantMenu.belongsTo(Restaurant, {
  foreignKey: "restaurant_id",
});

/*
  RESTAURANT_PHOTO
  */
RestaurantPhoto.belongsTo(Restaurant, {
  foreignKey: "restaurant_id",
});

/*
    CUSTOMER
*/
Customer.hasMany(Order, { foreignKey: "customer_id" });
Order.belongsTo(Customer, {
  foreignKey: "customer_id",
});
/*
CUSTOMER_ROLE
*/

Customer.belongsToMany(Restaurant, {
  through: CustomerRole,
  foreignKey: "customer_id",
  constraints: false,
});
/*
  CITY
*/
City.belongsToMany(Restaurant, {
  through: CityRestaurant,
  foreignKey: "city_id",
});

/*
  CUSTOMER_FAVORITE 
  */
CustomerFavorite.belongsTo(Customer, {
  foreignKey: "customer_id",
});

/*
  COOKING_TYPE
  */
CookingType.belongsToMany(Restaurant, {
  through: CookingTypeRestaurant,
  foreignKey: "cooking_type_id",
});

/*
  DISHES
  */
Dishes.belongsToMany(Restaurant, {
  through: DishesRestaurant,
  foreignKey: "dishes_id",
});

/*
  FRAME_AMBIENCE
  */
FrameAmbience.belongsToMany(Restaurant, {
  through: FrameAmbienceRestaurant,
  foreignKey: "frame_ambience_id",
});

/*
  ORDER
  */
Order.belongsTo(Restaurant, {
  foreignKey: "restaurant_id",
});
