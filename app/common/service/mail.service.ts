// import nodemailer
import nodeMailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;


const mailSender = async (email: string, title: string, body: string) => {
    try {
        // create Transporter
        const transporter = nodeMailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            }
        });


        // SEND MAIL
        let info = transporter.sendMail({
            from: "SOCIAL_MEDIA_APP ",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });
        console.log(info);
    } catch (err) {
        console.log("Error occured while sending mail", err);
    }
};

// export mailsender
export default mailSender;
