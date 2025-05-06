import { pool } from "../../db.js";
import "dotenv/config";
import * as Yup from "yup";

const createEmailSchema = Yup.object({
    from_who: Yup.string().required("Who is sending the email?"),
    to_who: Yup.string().required("Who is the receipient of the email?"),
    email_subject: Yup.string().required("What is the subject of the email?"),
    email_status: Yup.string(),
    text: Yup.string(),
    body_html: Yup.string(),
    sent_at: Yup.string(),
    user_id: Yup.number(),
});

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
        await createEmailSchema.validate(req.body, { abortEarly: false });
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
        // Handle validation or other errors
        if (error.inner) {
            // Yup validation error
            const errors = {};
            error.inner.forEach((err) => {
                errors[err.path] = err.message;
            });
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};
export default createEmail;
