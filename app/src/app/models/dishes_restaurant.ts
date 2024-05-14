// import { DataTypes } from "sequelize";
// import sequelize from "../api/config";
// import { Dishes } from "./dishes";
// import { Restaurant } from "./restaurant";



// export const DishesRestaurant = sequelize.define(
//     "dishes_restaurant",
//     {
//         restaurant_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: Restaurant,
//                 key: "id",
//             },
//         },
//         dishes_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: Dishes,
//                 key: "id",
//             },
//         },
//     },
//     {
//         timestamps: false,
//         freezeTableName: true,
//     }
// );

import { Model, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Restaurant } from './restaurant';
import { Dishes } from './dishes';

@Table({
  tableName: 'dishes_restaurant',
  timestamps: false,
  freezeTableName: true,
})
export class DishesRestaurant extends Model {
  @ForeignKey(() => Restaurant)
  @Column
  restaurant_id: number;
    
  @ForeignKey(() => Dishes)
  @Column
  dishes_id: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;
  
  @BelongsTo(() => Dishes)
  dish: Dishes;
}
