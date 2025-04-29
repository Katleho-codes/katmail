import "dotenv/config";
import nodemailer from "nodemailer";
import * as Yup from "yup";
import { pool } from "../../db.js";
import { generateAccessToken } from "../../utils/generate_token.js";
// Login route
// authentication

// Define Yup schema for request body validation
const forgotPasswordSchema = Yup.object({
    email: Yup.string()
        .email("Email is invalid!")
        .required("Email is required!"),
});

// Nodemailer setup (or use another email service)
const transporter = nodemailer.createTransport({
    host: `mail.example.co.za`,
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: `noreply@example.co.za`,
        pass: ``,
    },
    tls: {
        rejectUnauthorized: false, // Set to false for development, or if you encounter certificate issues
    },
});

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        // Validate request body
        await forgotPasswordSchema.validate(req.body, { abortEarly: false });

        // Check if user exists in the database
        const result = await pool.query(
            "SELECT email, user_password FROM users WHERE email = $1",
            [email]
        );
        if (result.rows.length === 0) {
            return res.status(401).send({ message: "User not found" });
        }
        const user = result.rows[0];
        // Generate a JWT token with a short expiration
        const resetToken = generateAccessToken({ userId: user.id });

        // const refreshToken = generateRefreshToken(user);

        // Send an email with the reset link
        const resetLink = `${process.env.NEXT_PUBLIC_CLIENT_URL}/reset-password?token=${resetToken}`;

        // Send the email using Nodemailer
        await transporter.sendMail({
            to: email,
            subject: "Password Reset Request",
            html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        });

        return res.json({
            message: "Password reset link has been sent to your email",
        });
    } catch (error) {
        // Handle validation or other errors
        if (error.inner) {
            // Yup validation error
            const errors = {};
            error.inner.forEach((err) => {
                errors[err.path] = err.message;
            });
            return res.status(400).json({ errors });
        }

        // Generic error handling
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default forgotPassword;
