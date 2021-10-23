import express from "express";
import { join, login } from "../controllers/userController";
import { home } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.route("/").get(home);
globalRouter.route("/join", join);
globalRouter.route("/login").get(login);

export default globalRouter;
