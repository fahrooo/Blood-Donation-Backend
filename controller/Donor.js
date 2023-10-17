import Donor from "../models/DonorModel.js";

export const getDonor = async (req, res) => {
  try {
    const donors = await Donor.findAll();

    if (donors.length > 0) {
      return res.status(200).json({
        status: 200,
        data: donors,
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
