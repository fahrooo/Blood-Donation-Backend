import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Faculty from "./FacultyModel.js";

const { DataTypes } = Sequelize;
const queryInterface = db.getQueryInterface();

const Users = db.define(
  "users",
  {
    idFaculty: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.ENUM("1", "2"),
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.BIGINT,
    },
    role: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
    },
    password: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

Users.belongsTo(Faculty, {
  foreignKey: "idFaculty",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

export default Users;

(async () => {
  await db.sync();
})();
