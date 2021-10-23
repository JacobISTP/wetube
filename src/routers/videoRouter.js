import express from "express";
import {
  edit,
  remove,
  watch,
  getUpload,
  postUpload,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.route("/:id(\\d+)").get(watch);
videoRouter.route("/:id(\\d+)/edit").get(edit);
videoRouter.route("/:id(\\d+)/delete").get(remove);

export default videoRouter;
