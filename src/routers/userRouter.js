import express from "express";
import { edit, remove, profile } from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/profile", profile);
userRouter.route("/edit", edit);
userRouter.route("/delete", remove);

export default userRouter;
