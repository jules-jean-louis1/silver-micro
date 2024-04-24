import { DataTypes } from "sequelize";
import sequelize from "../api/config";
import { Customer } from "./customer";

export const CustomerFavorite = sequelize.define(
  "customer_favorite",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

CustomerFavorite.belongsTo(Customer, { as: 'customer', foreignKey: 'customer_id' });
Customer.hasMany(CustomerFavorite, { as: 'favorites', foreignKey: 'customer_id' });