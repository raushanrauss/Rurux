const bcrypt = require("bcrypt");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const studentAuthMiddleware = require("../middlewares/studentAuth");
require("dotenv").config();

const userRouter = express.Router();
userRouter.post("/register", async (req, res) => {
  const saltRound = 10;
  try {
    const { name, email, password, stream, subject, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const user = await prisma.student.create({
      data: {
        email,
        name,
        password: hashedPassword,
        stream,
        subject,
        role,
      },
    });
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(401).send("Error");
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.student.findFirst({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, subjectId: user.subject },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

userRouter.get("/profile/", studentAuthMiddleware, async (req, res) => {
  try {
    const id = req.userId;
    const student = await prisma.student.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    if (!student) {
      return res.status(404).json({ error: "Student not found with given id" });
    }
    return res.json({ ...student });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

userRouter.get("/performance/", studentAuthMiddleware, async (req, res) => {
  try {
    const id = req.subjectId;
    const userId = req.userId;
    const marks = await prisma.marks.findFirst({
      where: {
        subjects: String(id),
        studentName: String(userId),
      },
    });

    return res.json(marks || {});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = userRouter;
