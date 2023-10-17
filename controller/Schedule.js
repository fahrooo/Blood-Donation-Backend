import Schedule from "../models/ScheduleModel.js";

export const getSchedule = async (req, res) => {
  try {
    const schedules = await Schedule.findAll();

    if (schedules.length > 0) {
      return res.status(200).json({
        status: 200,
        data: schedules,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Data Not Found",
      });
    }
  } catch {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
