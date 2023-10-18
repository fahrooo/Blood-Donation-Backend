import { Op } from "sequelize";
import Users from "../models/UsersModel.js";
import Faculty from "../models/FacultyModel.js";

export const getUser = async (req, res) => {
  const { faculty = "all", name = "all", role = "all" } = req.query;
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  const offset = limit * page;

  try {
    if (faculty == "all" && name == "all" && role == "all") {
      const totalRows = await Users.count();

      const totalPage = Math.ceil(totalRows / limit);

      const user = await Users.findAll({
        order: [["name", "ASC"]],
        offset: offset,
        limit: limit,
        include: [Faculty],
      });

      res.status(user.length ? 200 : 404).json({
        status: user.length ? 200 : 404,
        message: user.length ? "Data Found" : "Data Not Found",
        data: user.length ? user : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + user.length - 1,
        totalRows: user.length ? totalRows : null,
        totalPage: user.length ? totalPage : null,
      });
    } else if (faculty == "all" && name == "all" && role != "all") {
      const totalRows = await Users.count({
        where: { role: role },
      });

      const totalPage = Math.ceil(totalRows / limit);

      const user = await Users.findAll({
        where: { role: role },
        order: [["name", "ASC"]],
        offset: offset,
        limit: limit,
        include: [Faculty],
      });

      res.status(user.length ? 200 : 404).json({
        status: user.length ? 200 : 404,
        message: user.length ? "Data Found" : "Data Not Found",
        data: user.length ? user : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + user.length - 1,
        totalRows: user.length ? totalRows : null,
        totalPage: user.length ? totalPage : null,
      });
    } else if (faculty == "all" && name != "all" && role == "all") {
      const totalRows = await Users.count({
        where: { name: { [Op.substring]: name } },
      });

      const totalPage = Math.ceil(totalRows / limit);

      const user = await Users.findAll({
        where: { name: { [Op.substring]: name } },
        order: [["name", "ASC"]],
        offset: offset,
        limit: limit,
        include: [Faculty],
      });

      res.status(user.length ? 200 : 404).json({
        status: user.length ? 200 : 404,
        message: user.length ? "Data Found" : "Data Not Found",
        data: user.length ? user : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + user.length - 1,
        totalRows: user.length ? totalRows : null,
        totalPage: user.length ? totalPage : null,
      });
    } else if (faculty != "all" && name == "all" && role == "all") {
      const totalRows = await Users.count({
        where: { idFaculty: faculty },
      });

      const totalPage = Math.ceil(totalRows / limit);

      const user = await Users.findAll({
        where: { idFaculty: faculty },
        order: [["name", "ASC"]],
        offset: offset,
        limit: limit,
        include: [Faculty],
      });

      res.status(user.length ? 200 : 404).json({
        status: user.length ? 200 : 404,
        message: user.length ? "Data Found" : "Data Not Found",
        data: user.length ? user : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + user.length - 1,
        totalRows: user.length ? totalRows : null,
        totalPage: user.length ? totalPage : null,
      });
    } else if (faculty == "all" && name != "all" && role != "all") {
      const totalRows = await Users.count({
        where: {
          [Op.and]: [{ name: { [Op.substring]: name } }, { role: role }],
        },
      });

      const totalPage = Math.ceil(totalRows / limit);

      const user = await Users.findAll({
        where: {
          [Op.and]: [{ name: { [Op.substring]: name } }, { role: role }],
        },
        order: [["name", "ASC"]],
        offset: offset,
        limit: limit,
        include: [Faculty],
      });

      res.status(user.length ? 200 : 404).json({
        status: user.length ? 200 : 404,
        message: user.length ? "Data Found" : "Data Not Found",
        data: user.length ? user : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + user.length - 1,
        totalRows: user.length ? totalRows : null,
        totalPage: user.length ? totalPage : null,
      });
    } else if (faculty != "all" && name == "all" && role != "all") {
      const totalRows = await Users.count({
        where: {
          [Op.and]: [{ idFaculty: faculty }, { role: role }],
        },
      });

      const totalPage = Math.ceil(totalRows / limit);

      const user = await Users.findAll({
        where: {
          [Op.and]: [{ idFaculty: faculty }, { role: role }],
        },
        order: [["name", "ASC"]],
        offset: offset,
        limit: limit,
        include: [Faculty],
      });

      res.status(user.length ? 200 : 404).json({
        status: user.length ? 200 : 404,
        message: user.length ? "Data Found" : "Data Not Found",
        data: user.length ? user : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + user.length - 1,
        totalRows: user.length ? totalRows : null,
        totalPage: user.length ? totalPage : null,
      });
    } else if (faculty != "all" && name != "all" && role == "all") {
      const totalRows = await Users.count({
        where: {
          [Op.and]: [
            { name: { [Op.substring]: name } },
            { idFaculty: faculty },
          ],
        },
      });

      const totalPage = Math.ceil(totalRows / limit);

      const user = await Users.findAll({
        where: {
          [Op.and]: [
            { name: { [Op.substring]: name } },
            { idFaculty: faculty },
          ],
        },
        order: [["name", "ASC"]],
        offset: offset,
        limit: limit,
        include: [Faculty],
      });

      res.status(user.length ? 200 : 404).json({
        status: user.length ? 200 : 404,
        message: user.length ? "Data Found" : "Data Not Found",
        data: user.length ? user : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + user.length - 1,
        totalRows: user.length ? totalRows : null,
        totalPage: user.length ? totalPage : null,
      });
    } else {
      const totalRows = await Users.count({
        where: {
          [Op.and]: [
            { idFaculty: faculty },
            { name: { [Op.substring]: name } },
            { role: role },
          ],
        },
      });

      const totalPage = Math.ceil(totalRows / limit);

      const user = await Users.findAll({
        where: {
          [Op.and]: [
            { idFaculty: faculty },
            { name: { [Op.substring]: name } },
            { role: role },
          ],
        },
        order: [["name", "ASC"]],
        offset: offset,
        limit: limit,
        include: [Faculty],
      });

      res.status(user.length ? 200 : 404).json({
        status: user.length ? 200 : 404,
        message: user.length ? "Data Found" : "Data Not Found",
        data: user.length ? user : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + user.length - 1,
        totalRows: user.length ? totalRows : null,
        totalPage: user.length ? totalPage : null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
