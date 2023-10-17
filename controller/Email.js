import Email from "../models/EmailModel.js";

export const getEmail = async (req, res) => {
  try {
    const emails = await Email.findAll();

    if (emails.length > 0) {
      return res.status(200).json({
        status: 200,
        data: emails,
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
