// import { DataTypes } from "sequelize";
// import sequelize from "../api/config";
// import { Restaurant } from "./restaurant";
// import { Customer } from "./customer";

// export const Order = sequelize.define(
//   "order",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     seat: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     restaurant_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: Restaurant,
//         key: "id",
//       },
//     },
//     customer_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: Customer,
//         key: "id",
//       },
//     },
//     status: {
//       type: DataTypes.ENUM("pending", "completed", "cancelled", "confirmed"),
//       allowNull: false,
//       defaultValue: "pending",
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     updated_at: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//   },
//   {
//     timestamps: false,
//     freezeTableName: true,
//   }
// );

import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { Restaurant } from './restaurant';
import { Customer } from './customer';

@Table({
  tableName: 'order',
  timestamps: false,
  freezeTableName: true,
})
export class Order extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  seat: number;

  @ForeignKey(() => Restaurant)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  restaurant_id: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customer_id: number;

  @BelongsTo(() => Customer)
  customer: Customer;

  @Column({
    type: DataType.ENUM('pending', 'completed', 'cancelled', 'confirmed'),
    allowNull: false,
    defaultValue: 'pending',
  })
  status: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at: Date | null;
}