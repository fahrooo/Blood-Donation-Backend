import bcrypt from "bcrypt";
import Users from "../models/UsersModel.js";

export const register = async (req, res) => {
  const { idFaculty, name, gender, email, phone, role, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = await Users.create({
      idFaculty,
      name,
      gender,
      email,
      phone,
      role,
      password: hashPassword,
    });

    if (user) {
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

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (user == null) {
      return res.status(404).json({
        status: 404,
        message: "Email Not Found",
      });
    } else {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        res.status(200).json({
          status: 200,
          message: "Berhasil Login",
          data: user,
        });
      } else {
        return res.status(400).json({ status: 400, message: "Wrong Password" });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
