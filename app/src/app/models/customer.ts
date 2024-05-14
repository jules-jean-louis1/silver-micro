// import { DataTypes } from "sequelize";
// import sequelize from "../api/config";

// export const Customer = sequelize.define(
//   "customer",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     firstname: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     lastname: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     avatar: {
//       type: DataTypes.STRING,
//       allowNull: true,
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

import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table({
  tableName: 'customer',
  timestamps: false,
  freezeTableName: true,
})
export class Customer extends Model {
  @Column({ allowNull: true })
  firstname: string;

  @Column({ allowNull: true })
  lastname: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: true })
  avatar: string;

  @Column({ allowNull: false })
  created_at: Date;

  @Column({ allowNull: true })
  updated_at: Date;
}

