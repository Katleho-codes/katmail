import * as Yup from "yup";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { pool } from "../../db.js";

const resetPasswordSchema = Yup.object({
    token: Yup.string().required("Token is missing"),
    password: Yup.string().min(6).required("Password is required"),
});

const ResetPassword = async (req, res) => {
    try {
        await resetPasswordSchema.validate(req.body, { abortEarly: false });

        const { token, password } = req.body;

        const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query("UPDATE users SET user_password = $1 WHERE id = $2", [
            hashedPassword,
            decoded.id,
        ]);

        return res.status(200).json({ message: "Password successfully reset" });
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
export default ResetPassword;
