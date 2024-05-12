const express = require("express");
const jwt = require("jsonwebtoken");

const adminRouter = express.Router();
const { ADMIN_USERNAME, ADMIN_PASSWORD } = require("../constant");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

adminRouter.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username !== ADMIN_USERNAME || password != ADMIN_PASSWORD) {
      return res.status(400).json({ error: "Invalid admin creds" });
    }
    const token = jwt.sign(
      { username, admin: true },
      process.env.ADMIN_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    return res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

adminRouter.get("/studentList", async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    return res.json({ students });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = adminRouter;
