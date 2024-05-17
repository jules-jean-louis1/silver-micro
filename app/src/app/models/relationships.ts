import { City } from "./city";
import { CityRestaurant } from "./city_restaurant";
import { CookingType } from "./cooking_type";
import { CookingTypeRestaurant } from "./cooking_type_restaurant";
import { Customer } from "./customer";
import { Dishes } from "./dishes";
import { DishesRestaurant } from "./dishes_restaurant";
import { FrameAmbience } from "./frame_ambience";
import { FrameAmbienceRestaurant } from "./frame_ambience_restaurant";
import { Restaurant } from "./restaurant";
import { RestaurantMenu } from "./restaurant_menu";
import { RestaurantPhoto } from "./restaurant_photo";
import { CustomerRole } from "./customer_role_restaurant";
import { Order } from "./order";
import { Favorite } from "./customer_favorite";

/* 
    RESTAURANT 
*/
Restaurant.belongsToMany(Dishes, {
  through: DishesRestaurant,
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


Restaurant.hasMany(Order, {
  foreignKey: "restaurant_id",
});
Restaurant.belongsToMany(Customer, {
  through: Favorite,
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

/*
  CUSTOMER_FAVORITE 
  */
Customer.belongsToMany(Restaurant, {
  through: Favorite,
  foreignKey: "customer_id",
});

/*
  ORDER
  */
Order.belongsTo(Restaurant, {
  foreignKey: "restaurant_id",
});
// Customer and Restaurant
Customer.belongsToMany(Restaurant, { through: CustomerRole, foreignKey: 'customer_id' });
Restaurant.belongsToMany(Customer, { through: CustomerRole, foreignKey: 'restaurant_id' });
CustomerRole.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });
CustomerRole.belongsTo(Customer, { foreignKey: 'customer_id' });
Customer.hasMany(CustomerRole, { foreignKey: 'customer_id' });
Restaurant.hasMany(CustomerRole, { foreignKey: 'restaurant_id' });

// City and Restaurant
Restaurant.belongsToMany(City, { through: CityRestaurant, foreignKey: 'restaurant_id' });
City.belongsToMany(Restaurant, { through: CityRestaurant, foreignKey: 'city_id' });
CityRestaurant.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });
CityRestaurant.belongsTo(City, { foreignKey: 'city_id' });
Restaurant.hasMany(CityRestaurant, { foreignKey: 'restaurant_id' });
City.hasMany(CityRestaurant, { foreignKey: 'city_id' });

// CookingType and Restaurant
Restaurant.belongsToMany(CookingType, { through: CookingTypeRestaurant, foreignKey: 'restaurant_id' });
CookingType.belongsToMany(Restaurant, { through: CookingTypeRestaurant, foreignKey: 'cooking_type_id' });
CookingTypeRestaurant.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });
CookingTypeRestaurant.belongsTo(CookingType, { foreignKey: 'cooking_type_id' });
Restaurant.hasMany(CookingTypeRestaurant, { foreignKey: 'restaurant_id' });
CookingType.hasMany(CookingTypeRestaurant, { foreignKey: 'cooking_type_id' });

// FrameAmbience and Restaurant
Restaurant.belongsToMany(FrameAmbience, { through: FrameAmbienceRestaurant, foreignKey: 'restaurant_id' });
FrameAmbience.belongsToMany(Restaurant, { through: FrameAmbienceRestaurant, foreignKey: 'frame_ambience_id' });
FrameAmbienceRestaurant.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });
FrameAmbienceRestaurant.belongsTo(FrameAmbience, { foreignKey: 'frame_ambience_id' });
Restaurant.hasMany(FrameAmbienceRestaurant, { foreignKey: 'restaurant_id' });
FrameAmbience.hasMany(FrameAmbienceRestaurant, { foreignKey: 'frame_ambience_id' });


// Dishes and Restaurant
Restaurant.belongsToMany(Dishes, { through: DishesRestaurant, foreignKey: 'restaurant_id' });
Dishes.belongsToMany(Restaurant, { through: DishesRestaurant, foreignKey: 'dishes_id' });
DishesRestaurant.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });
DishesRestaurant.belongsTo(Dishes, { foreignKey: 'dishes_id' });
Restaurant.hasMany(DishesRestaurant, { foreignKey: 'restaurant_id' });
Dishes.hasMany(DishesRestaurant, { foreignKey: 'dishes_id' });