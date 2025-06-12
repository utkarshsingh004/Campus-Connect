// // routes/user.routes.js
// import { Router } from "express";
// import {registerUser} from "../controllers/user.controller.js";
// import { loginUser } from "../controllers/user.controller.js";
// import { logoutUser } from "../controllers/user.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { addCompanies, companiesDashboard, registerCollege } from "../controllers/user.controller.js";

// const userRouter = Router();
// userRouter.route("/register").post(registerUser);

// userRouter.route("/login").post(loginUser)

// userRouter.route('/college-registration-data').post(registerCollege)

// userRouter.route("/dashboard/companies/add").post(verifyJWT, upload.single('logo'), addCompanies)

// // userRouter.route("/dashboard/companies").get(companiesDashboard)

// userRouter.route("/dashboard/companies").get(verifyJWT,companiesDashboard)

// // Secured routes
// userRouter.route("/logout").post(verifyJWT, logoutUser)

// export default userRouter;

// routes/user.routes.js
import { Router } from "express";
import {registerUser} from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { logoutUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addCompanies, companiesDashboard, registerCollege } from "../controllers/user.controller.js";

const userRouter = Router();
userRouter.route("/register").post(registerUser);

userRouter.route("/login").post(loginUser)

userRouter.route('/college-registration-data').post(registerCollege)

userRouter.route("/dashboard/companies/add").post(verifyJWT, upload.single('logo'), addCompanies)

userRouter.route("/dashboard/companies").get(verifyJWT,companiesDashboard)

// userRouter.route("/dashboard/companies").get(verifyJWT,companiesDashboard)

// Secured routes
userRouter.route("/logout").post(verifyJWT, logoutUser)

export default userRouter;
