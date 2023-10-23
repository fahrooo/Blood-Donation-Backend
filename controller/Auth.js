import bcrypt from "bcrypt";
import Users from "../models/UsersModel.js";
import jwtEncode from "jwt-encode";

export const register = async (req, res) => {
  const { idFaculty, name, gender, email, phone, role, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const checkUser = await Users.findOne({ where: { email } });

    if (!checkUser) {
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
    } else {
      return res.status(404).json({
        status: 404,
        message: "Email is already",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userId = await Users.findOne({
      where: {
        email: email,
      },
      attributes: ["id"],
    });

    if (user == null) {
      return res.status(404).json({
        status: 404,
        message: "Email Not Found",
      });
    } else {
      const user = await Users.findOne({
        where: {
          email: email,
        },
      });
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwtEncode(userId, process.env.JWT_SECRET_KEY);

        res.status(200).json({
          status: 200,
          message: "Berhasil Login",
          data: token,
        });
      } else {
        return res.status(400).json({ status: 400, message: "Wrong Password" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
