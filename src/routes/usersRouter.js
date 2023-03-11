import Express from "express";
import { RegisterUser, LoginUser } from "../controllers/userController.js";

const userRouter = Express.Router();

userRouter.post("/register", RegisterUser);
userRouter.post("/login", LoginUser);

export default userRouter;
