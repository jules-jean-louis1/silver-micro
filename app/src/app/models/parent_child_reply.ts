import { DataTypes } from "sequelize";
import sequelize from "../api/config";
import { Reply } from "./reply";
import { Review } from "./review";

export const ParentChildReply = sequelize.define(
  "parent_child_reply",
  {
    parent_review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Review,
        key: "id",
      },
    },
    child_reply_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Reply,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
