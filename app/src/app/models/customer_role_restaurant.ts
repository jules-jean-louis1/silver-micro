import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Customer } from './customer';
import { Restaurant } from './restaurant';

<<<<<<< Updated upstream
export const CustomerRole = sequelize.define(
  "customer_role_restaurant",
  {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "id",
      },
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Restaurant,
        key: "id",
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "customer_role_restaurant",
  }
);
=======
@Table({
  tableName: 'customer_role_restaurant',
  timestamps: false,
})
export class CustomerRole extends Model {
  @ForeignKey(() => Customer)
  @Column({ allowNull: false })
  customer_id: number;

  @BelongsTo(() => Customer)
  customer: Customer;

  @ForeignKey(() => Restaurant)
  @Column({ allowNull: true })
  restaurant_id: number | null;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant | null;

  @Column({ allowNull: false })
  role: string;
}
>>>>>>> Stashed changes
