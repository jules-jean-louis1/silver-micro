// import { DataTypes } from "sequelize";
// import sequelize from "../api/config";

// export const Dishes = sequelize.define(
//   "dishes",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: false,
//     freezeTableName: true,
//   }
// );

import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import { Restaurant } from './restaurant';
import { DishesRestaurant } from './dishes_restaurant';

@Table({
  tableName: 'dishes',
  timestamps: false,
  freezeTableName: true,
})
export class Dishes extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  name: string;

  @BelongsToMany(() => Restaurant, () => DishesRestaurant)
  restaurants: Restaurant[];
}

