import bcrypt from "bcrypt";
import { pool } from "../../db.js";
import "dotenv/config";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../utils/generate_token.js";

import * as Yup from "yup";

// Define Yup schema for request body validation
const signupSchema = Yup.object().shape({
    full_name: Yup.string().required("Full name is required!"),
    email: Yup.string()
        .email("Email is invalid!")
        .required("Email is required!"),
    user_password: Yup.string()
        .required("Please Enter password")
        .min(6, "Password must be minimum 6 characters!"),
});

const signup = async (req, res) => {
    try {
        await signupSchema.validate(req.body, { abortEarly: false });

        const { full_name, email, user_role, user_password, created_at } =
            req.body;

        // Check if user with the same email already exists
        const userExistsResult = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (userExistsResult.rows.length > 0) {
            return res.status(401).json({
                message: "User already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(user_password, 10);

        // Set createdAt to current date if not provided
        const createdDate = created_at || new Date().toISOString();

        const result = await pool.query(
            "INSERT INTO users (full_name, email, user_role, user_password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id, unique_id, full_name, email, user_role, user_password, created_at",
            [full_name, email, user_role, hashedPassword, createdDate]
        );

        const user = result.rows[0];

        // Exclude password from the user object for the tokens
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

        // Store token in the database
        await pool.query(
            `INSERT INTO tokens (user_id, token, auth_type) VALUES ($1, $2, $3)`,
            [user.id, hashedRefreshToken, "signup"]
        );

        // Set refresh token in the cookie (secure for production)
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // only set secure in production
            sameSite: "Strict", // for CSRF protection
        });

        // Respond with success message and access token
        return res.status(201).json({
            message: "Account created",
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
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
};

export default signup;
