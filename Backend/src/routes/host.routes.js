import { Router } from "express";
import { verifyHostJWT } from "../middlewares/auth.middleware.js";
import { registerHost, loginHost } from '../controllers/host.controllers.js';

const hostRouter = Router();

hostRouter.route("/register").post(registerHost)

hostRouter.route("/login").post(loginHost)

export default hostRouter