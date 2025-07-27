import express from "express";
import { register, login, forgotPassword, getMe, resetPassword, logout } from "../controllers/authController";
const AuthRouter = express.Router()

AuthRouter.post("/api/auth/login", login)
AuthRouter.post("/api/auth/register", register)
AuthRouter.get("/api/auth/getMe", getMe)
AuthRouter.post("/api/auth/forgot", forgotPassword)
AuthRouter.post("/api/auth/reset", resetPassword)
AuthRouter.post("/api/auth/logout", logout)

export default AuthRouter