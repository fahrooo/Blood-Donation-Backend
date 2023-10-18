import { Op } from "sequelize";
import Email from "../models/EmailModel.js";
import Faculty from "../models/FacultyModel.js";
import nodemailer from "nodemailer";

export const getEmail = async (req, res) => {
  const { subject = "all", faculty = "all" } = req.query;
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  const offset = limit * page;

  try {
    if (subject == "all" && faculty == "all") {
      const totalRows = await Email.count();

      const totalPage = Math.ceil(totalRows / limit);

      const email = await Email.findAll({
        include: [Faculty],
        offset: offset,
        limit: limit,
        order: [["createdAt", "DESC"]],
      });

      res.status(email.length ? 200 : 404).json({
        status: email.length ? 200 : 404,
        message: email.length ? "Data Found" : "Data Not Found",
        data: email.length ? email : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + email.length - 1,
        totalRows: email.length ? totalRows : null,
        totalPage: email.length ? totalPage : null,
      });
    } else if (subject == "all" && faculty != "all") {
      const totalRows = await Email.count({
        where: { idFaculty: faculty },
        include: [Faculty],
      });

      const totalPage = Math.ceil(totalRows / limit);

      const email = await Email.findAll({
        where: { idFaculty: faculty },
        include: [Faculty],
        offset: offset,
        limit: limit,
        order: [["createdAt", "DESC"]],
      });

      res.status(email.length ? 200 : 404).json({
        status: email.length ? 200 : 404,
        message: email.length ? "Data Found" : "Data Not Found",
        data: email.length ? email : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + email.length - 1,
        totalRows: email.length ? totalRows : null,
        totalPage: email.length ? totalPage : null,
      });
    } else if (subject != "all" && faculty == "all") {
      const totalRows = await Email.count({
        where: { subject: { [Op.substring]: subject } },
        include: [Faculty],
      });

      const totalPage = Math.ceil(totalRows / limit);

      const email = await Email.findAll({
        where: { subject: { [Op.substring]: subject } },
        include: [Faculty],
        offset: offset,
        limit: limit,
        order: [["createdAt", "DESC"]],
      });

      res.status(email.length ? 200 : 404).json({
        status: email.length ? 200 : 404,
        message: email.length ? "Data Found" : "Data Not Found",
        data: email.length ? email : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + email.length - 1,
        totalRows: email.length ? totalRows : null,
        totalPage: email.length ? totalPage : null,
      });
    } else {
      const totalRows = await Email.count({
        where: {
          [Op.and]: [
            { idFaculty: faculty },
            { subject: { [Op.substring]: subject } },
          ],
        },
        include: [Faculty],
      });

      const totalPage = Math.ceil(totalRows / limit);

      const email = await Email.findAll({
        where: {
          [Op.and]: [
            { idFaculty: faculty },
            { subject: { [Op.substring]: subject } },
          ],
        },
        include: [Faculty],
        offset: offset,
        limit: limit,
        order: [["createdAt", "DESC"]],
      });

      res.status(email.length ? 200 : 404).json({
        status: email.length ? 200 : 404,
        message: email.length ? "Data Found" : "Data Not Found",
        data: email.length ? email : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + email.length - 1,
        totalRows: email.length ? totalRows : null,
        totalPage: email.length ? totalPage : null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export const getEmailById = async (req, res) => {
  const id = req.params.id;

  try {
    const checkEmailById = await Email.findByPk(id, {
      include: [Faculty],
    });

    if (checkEmailById) {
      return res.status(200).json({
        status: 200,
        data: checkEmailById,
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

export const postEmail = async (req, res) => {
  const { idFaculty, subject, message } = req.body;

  try {
    const email = await Email.create({
      idFaculty,
      subject,
      message,
    });

    if (email) {
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

export const putEmail = async (req, res) => {
  const { idFaculty, subject, message } = req.body;
  const id = req.params.id;

  try {
    const checkEmailById = await Email.findByPk(id);

    if (checkEmailById) {
      const email = await Email.update(
        {
          idFaculty,
          subject,
          message,
        },
        {
          where: { id },
        }
      );

      if (email) {
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

export const deleteEmail = async (req, res) => {
  const id = req.params.id;

  try {
    const checkEmailById = await Email.findByPk(id);

    if (checkEmailById) {
      const email = await Email.destroy({ where: { id } });

      if (email) {
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

export const sendEmail = async (req, res) => {
  const { toEmail, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mail_config = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: subject,
    html: message,
  };

  try {
    transporter.sendMail(mail_config, async function (err, info) {
      if (!err) {
        return res.status(200).json({
          status: 200,
          message: "Email sent successfully",
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: err.message,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
