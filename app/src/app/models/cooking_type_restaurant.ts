import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Restaurant } from "./restaurant";
import { CookingType } from "./cooking_type";

@Table({
    tableName: 'cooking_type_restaurant',
    timestamps: false,
    freezeTableName: true,
})
export class CookingTypeRestaurant extends Model {
    @ForeignKey(() => Restaurant)
    @Column
    restaurant_id: number;

    @ForeignKey(() => CookingType)
    @Column
    cooking_type_id: number;
}