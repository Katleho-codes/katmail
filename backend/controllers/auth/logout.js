import "dotenv/config";
import { verifyJwtToken } from "../../middleware/verify_token.js";
import { pool } from "../../db.js";

const logout = async (req, res) => {
    try {
        // Get the refresh token from the cookies
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({ message: "No refresh token found" });
        }

        // Verify the refresh token
        const user = verifyJwtToken(refreshToken);
        if (!user || !user.id) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        // Clear access and refresh tokens
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        // Optional: Invalidate the refresh token in the database
        await pool.query("DELETE FROM tokens WHERE user_id = $1", [user.id]);

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default logout;
