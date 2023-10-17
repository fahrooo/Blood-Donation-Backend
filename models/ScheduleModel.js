import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Faculty from "./FacultyModel.js";

const { DataTypes } = Sequelize;

const Schedule = db.define(
  "schedule",
  {
    idFaculty: {
      type: DataTypes.INTEGER,
    },
    opening: {
      type: DataTypes.DATE,
    },
    closed: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

Schedule.belongsTo(Faculty, {
  foreignKey: "idFaculty",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Schedule;

(async () => {
  await db.sync();
})();
