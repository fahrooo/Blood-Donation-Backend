import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";
import Schedule from "./ScheduleModel.js";

const { DataTypes } = Sequelize;

const Donor = db.define(
  "donor",
  {
    idUser: {
      type: DataTypes.INTEGER,
    },
    idSchedule: {
      type: DataTypes.INTEGER,
    },
    isDonor: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
  }
);

Donor.belongsTo(Users, {
  foreignKey: "idUser",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Donor.belongsTo(Schedule, {
  foreignKey: "idSchedule",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Donor;

(async () => {
  await db.sync();
})();
