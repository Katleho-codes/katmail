import express from "express";
import createEmail from "../../controllers/emails/create_email.js";
import getEmail from "../../controllers/emails/get_email.js";
import getEmailsByUser from "../../controllers/emails/get_emails.js";
import { limiter } from "../../middleware/rate_limiter.js";
import { authenticateToken } from "../../middleware/authenticate_token.js";

const router = express.Router();

router.post("/", limiter, authenticateToken, createEmail);
router.get("/:id", limiter, authenticateToken, getEmail);
router.get("/", limiter, authenticateToken, getEmailsByUser);

export { router };
