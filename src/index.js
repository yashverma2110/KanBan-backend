const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/user");
const boardRouter = require("./routers/board");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3001;
dotenv.config();

//registering middleware
// app.use((req, res, next) => {
//   res.status(503).send("We'll be back shortly!");
// });

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.options("*", cors());
app.get("/", (req, res) => res.send("Working!!!"));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(userRouter);
app.use(boardRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
