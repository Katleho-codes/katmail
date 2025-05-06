import express from "express";
import login from "../../controllers/auth/login.js";
import { limiter } from "../../middleware/rate_limiter.js";
import signup from "../../controllers/auth/signup.js";
import forgotPassword from "../../controllers/auth/forgot_password.js";
import { RefreshToken } from "../../middleware/refresh_token.js";
import { authenticateToken } from "../../middleware/authenticate_token.js";
import logout from "../../controllers/auth/logout.js";
import CurrentUser from "../../controllers/auth/current_user.js";
import ResetPassword from "../../controllers/auth/reset_password.js";

const router = express.Router();

router.post("/signup", limiter, signup);
router.post("/login", limiter, login);
router.get("/logout", limiter, logout);
router.post("/forgot_password", limiter, forgotPassword);
router.post("/reset_password", limiter, forgotPassword);
router.post("/refresh_token", limiter, RefreshToken);
router.get("/me", authenticateToken, CurrentUser);

export { router };
