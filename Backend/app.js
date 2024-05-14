const express = require("express");

const { PrismaClient } = require("@prisma/client");
const subjecRouter = require("./Routes/subjectRouter");
const userRouter = require("./Routes/userRouter");
const streamRouter = require("./Routes/streamRouter");
const adminRouter = require("./Routes/AdminRouter");
const adminAuth = require("./middlewares/adminAuth");
const prisma = new PrismaClient();
const cors = require("cors");
const marksRouter = require("./Routes/marksRouter");
const publicRouter = require("./Routes/publicRouter");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/user/profile", userRouter);
app.use("/public", publicRouter);
app.use("/subject", adminAuth, subjecRouter);
app.use("/stream", adminAuth, streamRouter);
app.use("/mark", adminAuth, marksRouter);
app.use(adminRouter);

app.listen(3000, () => {
  console.log("Server is running at 3000");
});
module.exports = prisma;
