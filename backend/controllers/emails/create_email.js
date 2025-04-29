import { pool } from "../../db.js";
import "dotenv/config";
import * as Yup from "yup";

const createEmailSchema = Yup.object({});

const createEmail = async (req, res) => {
    const {
        from_who,
        to_who,
        email_subject,
        email_status,
        text,
        body_html,
        sent_at,
        user_id,
    } = req.body;
    try {
        const { rows } = await pool.query(
            "insert into emails (from_who, to_who, email_subject, text, body_html, email_status, sent_at, user_id) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
            [
                from_who,
                to_who,
                email_subject,
                text,
                body_html,
                email_status,
                sent_at,
                user_id,
            ]
        );
        res.status(201).json({ message: "Email sent!", data: rows[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export default createEmail;
