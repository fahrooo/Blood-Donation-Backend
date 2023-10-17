import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Faculty from "./FacultyModel.js";

const { DataTypes } = Sequelize;

const Email = db.define(
  "Email",
  {
    idFaculty: {
      type: DataTypes.INTEGER,
    },
    subject: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

Email.belongsTo(Faculty, {
  foreignKey: "idFaculty",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Email;

(async () => {
  await db.sync();
})();
