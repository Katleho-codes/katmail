import { pool } from "../../db.js";
import "dotenv/config";

const getEmailsByUser = async (req, res) => {
    const userId = req.user.id; // From JWT, not from query

    try {
        const { rows } = await pool.query(
            `select * from emails where user_id = $1`,
            [userId]
        );
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export default getEmailsByUser;
