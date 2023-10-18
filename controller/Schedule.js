import Faculty from "../models/FacultyModel.js";
import Schedule from "../models/ScheduleModel.js";

export const getSchedule = async (req, res) => {
  const { faculty = "all" } = req.query;
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  const offset = limit * page;

  try {
    if (faculty == "all") {
      const totalRows = await Schedule.count();

      const totalPage = Math.ceil(totalRows / limit);

      const schedule = await Schedule.findAll({
        include: [Faculty],
        order: [["closed", "DESC"]],
        offset: offset,
        limit: limit,
      });

      res.status(schedule.length ? 200 : 404).json({
        status: schedule.length ? 200 : 404,
        message: schedule.length ? "Data Found" : "Data Not Found",
        data: schedule.length ? schedule : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + schedule.length - 1,
        totalRows: schedule.length ? totalRows : null,
        totalPage: schedule.length ? totalPage : null,
      });
    } else {
      const totalRows = await Schedule.count({
        where: { idFaculty: faculty },
      });

      const totalPage = Math.ceil(totalRows / limit);

      const schedule = await Schedule.findAll({
        where: { idFaculty: faculty },
        include: [Faculty],
        order: [["closed", "DESC"]],
        offset: offset,
        limit: limit,
      });

      res.status(schedule.length ? 200 : 404).json({
        status: schedule.length ? 200 : 404,
        message: schedule.length ? "Data Found" : "Data Not Found",
        data: schedule.length ? schedule : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + schedule.length - 1,
        totalRows: schedule.length ? totalRows : null,
        totalPage: schedule.length ? totalPage : null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export const getScheduleById = async (req, res) => {
  const id = req.params.id;

  try {
    const checkScheduleById = await Schedule.findByPk(id, {
      include: [Faculty],
    });

    if (checkScheduleById) {
      return res.status(200).json({
        status: 200,
        data: checkScheduleById,
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

export const postSchedule = async (req, res) => {
  const { idFaculty, opening, closed } = req.body;

  try {
    const schedule = await Schedule.create({
      idFaculty,
      opening,
      closed,
    });

    if (schedule) {
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

export const putSchedule = async (req, res) => {
  const { idFaculty, opening, closed } = req.body;
  const id = req.params.id;

  try {
    const checkScheduleById = await Schedule.findByPk(id);

    if (checkScheduleById) {
      const schedule = await Schedule.update(
        {
          idFaculty,
          opening,
          closed,
        },
        {
          where: { id },
        }
      );

      if (schedule) {
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

export const deleteSchedule = async (req, res) => {
  const id = req.params.id;

  try {
    const checkScheduleById = await Schedule.findByPk(id);

    if (checkScheduleById) {
      const schedule = await Schedule.destroy({ where: { id } });

      if (schedule) {
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
