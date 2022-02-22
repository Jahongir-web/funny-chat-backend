import nodemailer from "nodemailer";
import { ISendEmail } from "../config/interfaces";

const sendEmail = async (options: ISendEmail) => {
  try {
    const transporter = await nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "jahongirmh@gmail.com",
        pass: "7008779a",
      },
      from: "jahongirmh@gmail.com",
    });

    const mailOptions = {
      from: "jahongirmh@gmail.com",
      to: options.to,
      subject: options.subject,
      html: options.text,
    };

    const result: object | null = await transporter.sendMail(mailOptions);

    return { info: result, err: null };
  } catch (err) {
    return { err, info: null };
  }
};

export default sendEmail;
