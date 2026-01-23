import nodemailer from "nodemailer";
import dotenv from 'dotenv'

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async ({ to, subject, text }) => {
    await transporter.sendMail({
        from: `Expense Tracker <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text
    });
};

export default sendEmail;
