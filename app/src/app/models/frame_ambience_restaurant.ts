// import { DataTypes } from "sequelize";
// import sequelize from "../api/config";
// import { Restaurant } from "./restaurant";
// import { FrameAmbience } from "./frame_ambience";

// export const FrameAmbienceRestaurant = sequelize.define(
//     "frame_ambience_restaurant",
//     {
//         restaurant_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: Restaurant,
//                 key: "id",
//             },
//         },
//         frame_ambience_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: FrameAmbience,
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
import { FrameAmbience } from './frame_ambience';

@Table({
  tableName: 'frame_ambience_restaurant',
  timestamps: false,
  freezeTableName: true,
})
export class FrameAmbienceRestaurant extends Model {
  @ForeignKey(() => Restaurant)
  @Column
  restaurant_id: number;
    
  @ForeignKey(() => FrameAmbience)
  @Column
  frame_ambience_id: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;
  
  @BelongsTo(() => FrameAmbience)
  frame_ambience: FrameAmbience;
}