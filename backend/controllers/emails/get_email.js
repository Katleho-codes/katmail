import { pool } from "../../db.js";
import "dotenv/config";

const getEmail = async (req, res) => {

    const { id } = req.query;
    const userId = req.user.id; // From JWT, not from query
    try {
        const { rows } = await pool.query(
            `select * from emails where id = $1 and user_id = $2`,
            [id, userId]
        );
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
export default getEmail;
