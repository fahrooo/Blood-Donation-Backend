import Users from "../models/UsersModel.js";

export const getUser = async (req, res) => {
  try {
    const users = await Users.findAll();

    if (users.length > 0) {
      return res.status(200).json({
        status: 200,
        data: users,
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
