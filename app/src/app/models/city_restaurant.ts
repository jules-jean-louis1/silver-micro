import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Restaurant } from './restaurant';
import { City } from './city';

@Table({
  tableName: 'city_restaurant',
  timestamps: false,
  freezeTableName: true,
})
export class CityRestaurant extends Model {
  @ForeignKey(() => Restaurant)
  @Column
  restaurant_id: number;

  @ForeignKey(() => City)
  @Column
  city_id: number;
}