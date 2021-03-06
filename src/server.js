import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "hello",
    resave: true,
    saveUninitialized: true,
  })
);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users/:id([0-9a-f]{24})", userRouter);

export default app;
