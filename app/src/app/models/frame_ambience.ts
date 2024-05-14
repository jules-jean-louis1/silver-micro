// import { DataTypes } from "sequelize";
// import sequelize from "../api/config";

// export const FrameAmbience = sequelize.define(
//   "frame_ambience",
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
} from "sequelize-typescript";
import { Restaurant } from "./restaurant";
import { FrameAmbienceRestaurant } from "./frame_ambience_restaurant";

@Table({
  tableName: "frame_ambience",
  timestamps: false,
  freezeTableName: true,
})
export class FrameAmbience extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  name: string;

  @BelongsToMany(() => Restaurant, () => FrameAmbienceRestaurant)
  restaurants: Restaurant[];
}
