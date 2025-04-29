import bcrypt from "bcrypt";
import { pool } from "../../db.js";
import "dotenv/config";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../utils/generate_token.js";
import * as Yup from "yup";

// Define Yup schema for request body validation
const loginSchema = Yup.object({
    email: Yup.string()
        .email("Email is invalid!")
        .required("Email is required!"),
    password: Yup.string()
        .required("Please Enter password")
        .min(6, "Password must be minimum 6 characters!"),
});

const login = async (req, res) => {
    try {
        // Validate request body
        await loginSchema.validate(req.body, { abortEarly: false });

        const { email, password } = req.body;

        // Query the database for user details and password in a single query
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(
            password,
            user.user_password
        );

        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Add the user to login history table as success
        // await LoginHistory(user.user_id, "password", "success");

        // Exclude the password and use only the relevant fields for the tokens
        const userForToken = {
            id: user.id,
            unique_id: user.unique_id,
            email: user.email,
            full_name: user.full_name,
            user_role: user.user_role,
            created_at: user.created_at,
        };

        // Generate tokens (without the password)
        const accessToken = generateAccessToken(userForToken);
        const refreshToken = generateRefreshToken(userForToken);

        // Hash refresh token before storing it
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        // Store hashed refresh token in the database
        await pool.query(
            `INSERT INTO tokens (user_id, token, auth_type) VALUES ($1, $2, $3) 
             ON CONFLICT (user_id) DO UPDATE SET token = EXCLUDED.token`,
            [user.id, hashedRefreshToken, "login"]
        );

        // Send the refresh token as a secure, httpOnly cookie (considering HTTPS)
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // only set secure in production
            sameSite: "Strict", // for CSRF protection
        });

        // Respond with success message and access token
        res.status(201).json({
            message: "Successfully logged in",
            token: accessToken,
        });
    } catch (error) {
        console.log(error);
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

export default login;
