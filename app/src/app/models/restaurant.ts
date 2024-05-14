import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import { Dishes } from './dishes';
import { DishesRestaurant } from './dishes_restaurant';
import { FrameAmbience } from './frame_ambience';
import { FrameAmbienceRestaurant } from './frame_ambience_restaurant';

@Table({
  tableName: 'restaurant',
  timestamps: false,
  freezeTableName: true,
})
export class Restaurant extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  seat: number;

  @Column
  description: string;

  @Column
  close_monday: boolean;

  @Column
  close_tuesday: boolean;

  @Column
  opening_time: string;

  @Column
  closing_time: string;

  @Column
  address: string;

  @BelongsToMany(() => Dishes, () => DishesRestaurant)
  dishes: Dishes[];

  @BelongsToMany(() => FrameAmbience, () => FrameAmbienceRestaurant)
  frame_ambience: FrameAmbience[];
}
