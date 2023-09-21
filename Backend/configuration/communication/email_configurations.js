import nodemailer from "nodemailer"
import 'dotenv/config'
// Configuration for nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.APP_PASSWORD
    }
});

export default transporter