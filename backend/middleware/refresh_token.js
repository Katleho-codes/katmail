import "dotenv/config";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/generate_token.js";
import bcrypt from "bcrypt";
import { pool } from "../db.js";
export const RefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            return res
                .status(401)
                .json({ message: "Refresh token not provided" });

        // find the user associated with this refresh token
        const result = await pool.query(
            "select user_id, token from tokens where auth_type = 'login'"
        );
        const tokens = result.rows;
        // check if any token matches, tokens should be hashed in db
        let userId = null;
        for (const tokenEntry of tokens) {
            const isMatch = await bcrypt.compare(
                refreshToken,
                tokenEntry.token
            );
            if (isMatch) {
                userId = tokenEntry.user_id;
                break;
            }
        }
        if (!userId) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        const userResult = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [userId]
        );
        if (userResult.rows.length === 0)
            return resizeTo.status(404).json({ message: "User not found" });

        const user = userResult.rows[0];

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
        const newAccessToken = generateAccessToken(userForToken);
        const newRefreshToken = generateRefreshToken(userForToken);

        // Hash refresh token before storing it
        const hashedNewRefreshToken = await bcrypt.hash(newRefreshToken, 10);

        // update tokens table
        await pool.query("update tokens set token = $1 where id = $2", [
            hashedNewRefreshToken,
            user.id,
        ]);

        // Set new refresh token in cookie
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // only set secure in production
            sameSite: "Strict", // for CSRF protection
        });

        res.status(201).json({
            message: "Successfully logged in",
            token: newAccessToken,
        });

        // jwt.verify(refreshToken, `${process.env.JWT_TOKEN_KEY}`, (err, user) => {
        //     if (err)
        //         return res.status(403).json({ message: "Invalid refresh token" });
        //     const accessToken = generateAccessToken({ email: user.email });
        //     res.json({ accessToken });
        // });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
