import jwt from "jsonwebtoken";

const VerifyResetToken = (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: "Missing token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
        return res.json({ valid: true, decoded });
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default VerifyResetToken;
// jwt.verify(token, secret) will check if the token is valid or expired.

// If good → return { valid: true, decoded }.

// If bad → return 401 Unauthorized.
