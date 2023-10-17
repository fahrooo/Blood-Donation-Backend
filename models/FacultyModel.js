import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const queryInterface = db.getQueryInterface();

const Faculty = db.define(
  "faculty",
  {
    code: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Faculty;

(async () => {
  await db.sync();
})();
