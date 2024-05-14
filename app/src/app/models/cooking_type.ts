import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({
  tableName: 'cooking_type',
  timestamps: false,
  freezeTableName: true,
})
export class CookingType extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;
}
