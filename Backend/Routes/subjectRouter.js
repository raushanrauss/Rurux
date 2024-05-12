const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const subjectRouter = express.Router();

subjectRouter.get("/", async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany({
      select: {
        id: true,
        name: true,
        stream: true,
      },
    });
    return res.json({ subjects });
  } catch (err) {
    return res.status(500).json({ err: "Something went wrong" });
  }
});

subjectRouter.post("/add", async (req, res) => {
  const { name, stream } = req.body;
  if (!name || !stream) {
    return res.status(400).json({ error: "Name or stream is missing" });
  }
  try {
    const subject = await prisma.subject.create({
      data: {
        name,
        stream,
      },
    });
    res.status(200).send(subject);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

subjectRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const subject = await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).send(subject);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

subjectRouter.patch("/update/:id", async (req, res) => {
  const { name, stream } = req.body;
  const { id } = req.params;
  try {
    const subject = await prisma.subject.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        stream,
      },
    });
    res.status(200).send(subject);
  } catch (err) {
    console.log(err);
    res.status(401).send("Error");
  }
});
module.exports = subjectRouter;
