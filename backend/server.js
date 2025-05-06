import express from "express";
import { pool } from "./db.js";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import helmet from "helmet";
import { router as auth } from "./routes/auth/index.js";
import { router as emails } from "./routes/emails/index.js";
import nodemailer from "nodemailer";
const app = express();

app.use(
    cors({
        origin: [`${process.env.NEXT_PUBLIC_CLIENT_URL}`],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true, // Allow credentials (cookies, authorization headers)
    })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser());
app.use(express.json()); // Handle JSON requests
app.use(compression());
app.set("trust proxy", 1); // trust first proxy
app.disable("x-powered-by");

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "katlehomabala3@gmail.com",
//         pass: "ucml ipua rksz verj", // Use app password here
//     },
// });

// const mailOptions = {
//     from: "noreply@ac.com",
//     to: "katlehomabala3@gmail.com",
//     subject: "Test Email from Nodemailer",
//     text: "This is a test email using Gmail + Nodemailer!",
// };

// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log("Error:", error);
//     }
//     console.log("Email sent:", info.response);
// });

// // Authentication
app.use("/auth", auth);
app.use("/emails", emails);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(8000, () => {
    if (process.env.NODE_ENV !== "production") {
        console.log(`Server is up`);
    }
});
