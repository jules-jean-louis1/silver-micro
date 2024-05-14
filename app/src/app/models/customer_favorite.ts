import {
  Table,
  Column,
  Model,
  ForeignKey,
  PrimaryKey,
} from "sequelize-typescript";
import { Customer } from "./customer";

@Table({
  tableName: "customer_favorite",
  timestamps: false,
  freezeTableName: true,
})
export class CustomerFavorite extends Model {
  @PrimaryKey
  @Column({ allowNull: true })
  @PrimaryKey
  id: number;

  @ForeignKey(() => Customer)
  @Column({ allowNull: false })
  customer_id: number;

  @Column({ allowNull: false })
  created_at: Date;

  @Column({ allowNull: true })
  updated_at: Date;
}
