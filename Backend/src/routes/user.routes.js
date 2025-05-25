// routes/user.routes.js
import { Router } from "express";
import {registerUser} from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { logoutUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addCompanies } from "../controllers/user.controller.js";

const userRouter = Router();
userRouter.route("/register").post(registerUser);

userRouter.route("/login").post(loginUser)

userRouter.route("/dashboard/companies/add").post(verifyJWT, upload.single('logo'), addCompanies)


// Secured routes
userRouter.route("/logout").post(verifyJWT, logoutUser)

export default userRouter;
