import { Op } from "sequelize";
import Faculty from "../models/FacultyModel.js";

export const getFaculty = async (req, res) => {
  const { name = "all" } = req.query;
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  const offset = limit * page;

  try {
    if (name == "all") {
      const totalRows = await Faculty.count();

      const totalPage = Math.ceil(totalRows / limit);

      const faculties = await Faculty.findAll({
        order: [["name", "ASC"]],
        offset: offset,
        limit: limit,
      });

      res.status(faculties.length ? 200 : 404).json({
        status: faculties.length ? 200 : 404,
        message: faculties.length ? "Data Found" : "Data Not Found",
        data: faculties.length ? faculties : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + faculties.length - 1,
        totalRows: faculties.length ? totalRows : null,
        totalPage: faculties.length ? totalPage : null,
      });
    } else {
      const totalRows = await Faculty.count({
        where: { name: { [Op.substring]: name } },
      });

      const totalPage = Math.ceil(totalRows / limit);

      const faculties = await Faculty.findAll({
        where: { name: { [Op.substring]: name } },
        order: [["name", "ASC"]],
        offset: offset,
        limit: limit,
      });

      res.status(faculties.length ? 200 : 404).json({
        status: faculties.length ? 200 : 404,
        message: faculties.length ? "Data Found" : "Data Not Found",
        data: faculties.length ? faculties : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + faculties.length - 1,
        totalRows: faculties.length ? totalRows : null,
        totalPage: faculties.length ? totalPage : null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export const getFacultyById = async (req, res) => {
  const id = req.params.id;

  try {
    const checkFacultyById = await Faculty.findByPk(id);

    if (checkFacultyById) {
      return res.status(200).json({
        status: 200,
        data: checkFacultyById,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Data not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export const postFaculty = async (req, res) => {
  const { code, name } = req.body;

  try {
    const faculty = await Faculty.create({
      code,
      name,
    });

    if (faculty) {
      return res.status(200).json({
        status: 200,
        message: "Created successfully",
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Created Failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export const putFaculty = async (req, res) => {
  const { code, name } = req.body;
  const id = req.params.id;

  try {
    const checkFacultyById = await Faculty.findByPk(id);

    if (checkFacultyById) {
      const faculty = await Faculty.update(
        {
          code,
          name,
        },
        {
          where: { id },
        }
      );

      if (faculty) {
        return res.status(200).json({
          status: 200,
          message: "Updated successfully",
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Updated Failed",
        });
      }
    } else {
      return res.status(404).json({
        status: 404,
        message: "Data not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export const deleteFaculty = async (req, res) => {
  const id = req.params.id;

  try {
    const checkFacultyById = await Faculty.findByPk(id);

    if (checkFacultyById) {
      const faculty = await Faculty.destroy({ where: { id } });

      if (faculty) {
        return res.status(200).json({
          status: 200,
          message: "Deleted successfully",
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Deleted Failed",
        });
      }
    } else {
      return res.status(404).json({
        status: 404,
        message: "Data not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
