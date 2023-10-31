import { Op, QueryTypes } from "sequelize";
import db from "../config/Database.js";
import Donor from "../models/DonorModel.js";
import Schedule from "../models/ScheduleModel.js";
import Users from "../models/UsersModel.js";
import Faculty from "../models/FacultyModel.js";

export const getDonor = async (req, res) => {
  const { name = "all", faculty = "all" } = req.query;
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  const offset = limit * page;

  try {
    if (name == "all" && faculty == "all") {
      const totalRows = await Donor.count();

      const totalPage = Math.ceil(totalRows / limit);

      const donor = await Donor.findAll({
        include: [
          {
            model: Users,
          },
          {
            model: Schedule,
            include: [Faculty],
          },
        ],
        where: { isRegister: true },
        offset: offset,
        limit: limit,
        order: [
          [db.col("closed"), "DESC"],
          ["isDonor", "ASC"],
        ],
      });

      res.status(donor.length ? 200 : 404).json({
        status: donor.length ? 200 : 404,
        message: donor.length ? "Data Found" : "Data Not Found",
        data: donor.length ? donor : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + donor.length - 1,
        totalRows: donor.length ? totalRows : null,
        totalPage: donor.length ? totalPage : null,
      });
    } else if (name == "all" && faculty != "all") {
      const totalRows = await Donor.count({
        include: [
          {
            model: Users,
          },
          {
            model: Schedule,
            include: [Faculty],
            where: { idFaculty: faculty },
          },
        ],
        where: { isRegister: true },
      });

      const totalPage = Math.ceil(totalRows / limit);

      const donor = await Donor.findAll({
        include: [
          {
            model: Users,
          },
          {
            model: Schedule,
            include: [Faculty],
            where: { idFaculty: faculty },
          },
        ],
        where: { isRegister: true },
        offset: offset,
        limit: limit,
        order: [
          [db.col("closed"), "DESC"],
          ["isDonor", "ASC"],
        ],
      });

      res.status(donor.length ? 200 : 404).json({
        status: donor.length ? 200 : 404,
        message: donor.length ? "Data Found" : "Data Not Found",
        data: donor.length ? donor : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + donor.length - 1,
        totalRows: donor.length ? totalRows : null,
        totalPage: donor.length ? totalPage : null,
      });
    } else if (name != "all" && faculty == "all") {
      const totalRows = await Donor.count({
        include: [
          {
            model: Users,
            where: { name: { [Op.substring]: name } },
          },
          {
            model: Schedule,
            include: [Faculty],
          },
        ],
        where: { isRegister: true },
      });

      const totalPage = Math.ceil(totalRows / limit);

      const donor = await Donor.findAll({
        include: [
          {
            model: Users,
            where: { name: { [Op.substring]: name } },
          },
          {
            model: Schedule,
            include: [Faculty],
          },
        ],
        where: { isRegister: true },
        offset: offset,
        limit: limit,
        order: [
          [db.col("closed"), "DESC"],
          ["isDonor", "ASC"],
        ],
      });

      res.status(donor.length ? 200 : 404).json({
        status: donor.length ? 200 : 404,
        message: donor.length ? "Data Found" : "Data Not Found",
        data: donor.length ? donor : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + donor.length - 1,
        totalRows: donor.length ? totalRows : null,
        totalPage: donor.length ? totalPage : null,
      });
    } else {
      const totalRows = await Donor.count({
        include: [
          {
            model: Users,
            where: { name: { [Op.substring]: name } },
          },
          {
            model: Schedule,
            include: [Faculty],
            where: { idFaculty: faculty },
          },
        ],
        where: { isRegister: true },
      });

      const totalPage = Math.ceil(totalRows / limit);

      const donor = await Donor.findAll({
        include: [
          {
            model: Users,
            where: { name: { [Op.substring]: name } },
          },
          {
            model: Schedule,
            include: [Faculty],
            where: { idFaculty: faculty },
          },
        ],
        where: { isRegister: true },
        offset: offset,
        limit: limit,
        order: [
          [db.col("closed"), "DESC"],
          ["isDonor", "ASC"],
        ],
      });

      res.status(donor.length ? 200 : 404).json({
        status: donor.length ? 200 : 404,
        message: donor.length ? "Data Found" : "Data Not Found",
        data: donor.length ? donor : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + donor.length - 1,
        totalRows: donor.length ? totalRows : null,
        totalPage: donor.length ? totalPage : null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export const getDonorById = async (req, res) => {
  const id = req.params.id;

  try {
    const checkDonorById = await Donor.findByPk(id, {
      include: [
        {
          model: Users,
        },
        {
          model: Schedule,
          include: [Faculty],
        },
      ],
    });

    if (checkDonorById) {
      return res.status(200).json({
        status: 200,
        data: checkDonorById,
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

export const postDonor = async (req, res) => {
  const { idUser, idSchedule, isDonor, isRegister } = req.body;

  try {
    const donor = await Donor.create({
      idUser,
      idSchedule,
      isDonor,
      isRegister,
    });

    if (donor) {
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

export const putDonor = async (req, res) => {
  const { idUser, idSchedule, isDonor, isRegister } = req.body;
  const id = req.params.id;

  try {
    const checkDonorById = await Donor.findByPk(id);

    if (checkDonorById) {
      const donor = await Donor.update(
        {
          idUser,
          idSchedule,
          isDonor,
          isRegister,
        },
        {
          where: { id },
        }
      );

      if (donor) {
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

export const deleteDonor = async (req, res) => {
  const id = req.params.id;

  try {
    const checkDonorById = await Donor.findByPk(id);

    if (checkDonorById) {
      const donor = await Donor.destroy({ where: { id } });

      if (donor) {
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

export const donorByDate = async (req, res) => {
  const { idUser, date } = req.body;

  try {
    const donor = await Donor.findAll({
      where: {
        idUser: idUser,
      },
      include: [
        {
          model: Users,
        },
        {
          model: Schedule,
          where: {
            closed: {
              [Op.gte]: date,
            },
          },
          include: [Faculty],
        },
      ],
    });

    if (donor) {
      return res.status(200).json({
        status: 200,
        data: donor,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Data Not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const donorByMonthYear = async (req, res) => {
  const { month, year } = req.body;

  try {
    const donor = await db.query(
      `SELECT
    * 
  FROM
    (
    SELECT EXTRACT
      ( MONTH FROM schedule.closed ) AS yr_month,
      EXTRACT ( YEAR FROM schedule.closed ) AS yr 
    FROM
      "donor"
      JOIN schedule ON donor."idSchedule" = schedule.ID 
      WHERE donor."isDonor" = TRUE
    ) AS DATE 
  WHERE
    yr_month = '${month}' 
    AND yr = '${year}'`,
      { type: QueryTypes.SELECT }
    );

    if (donor) {
      return res.status(200).json({
        status: 200,
        data: donor,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Data Not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
