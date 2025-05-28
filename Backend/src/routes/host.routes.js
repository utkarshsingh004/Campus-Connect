import { Router } from "express";
import { verifyHostJWT } from "../middlewares/auth.middleware.js";
import { registerHost, loginHost, allUsers, allNewUsers } from '../controllers/host.controllers.js';

const hostRouter = Router();

hostRouter.route("/register").post(registerHost)

hostRouter.route("/login").post(loginHost)

hostRouter.route("/all-users").get(allUsers)

hostRouter.route("/new-users").get(allNewUsers)

export default hostRouter