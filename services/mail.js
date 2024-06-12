import dotenv from "dotenv";
import { createTransport } from "nodemailer";

dotenv.config();

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = (email, otp) => {
  var mailOptions = {
    from: "muriel.turner48@ethereal.email", //process.env.SMTP_MAIL,
    to: email,
    subject: "E-commerce: OTP Verification",
    text: `Your verification OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Email sent successfully!");
      return true;
    }
  });
};

export default sendEmail;
