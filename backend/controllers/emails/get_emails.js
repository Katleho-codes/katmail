import { pool } from "../../db.js";
import "dotenv/config";

const getEmailsByUser = async (req, res) => {
    const userId = req.user.id; // From JWT
    let { page = 1, limit = 10 } = req.query;

    // Parse and sanitize
    page = Math.max(parseInt(page, 10) || 1, 1);
    limit = Math.max(parseInt(limit, 10) || 10, 1);
    const offset = (page - 1) * limit;

    try {
        const { rows } = await pool.query(
            `SELECT * FROM emails WHERE user_id = $1 
             ORDER BY sent_at DESC 
             LIMIT $2 OFFSET $3`,
            [userId, limit, offset]
        );
        // Fetch the total count of comments
        const total = await pool.query(
            "SELECT COUNT(*) FROM emails WHERE user_id = $1",
            [userId]
        );
        const totalEmails = parseInt(total.rows[0].count, 10);
        return res.status(200).json({
            data: rows,
            meta: {
                currentPage: page,
                totalPages: Math.ceil(totalEmails / limit),
                totalEmails,
            },
        }); // Explicit 200 OK status
    } catch (error) {
        console.error("Email fetch error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default getEmailsByUser;
