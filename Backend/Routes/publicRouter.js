const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const publicRouter = express.Router();

publicRouter.get("/streams", async (req, res) => {
  try {
    const stream = await prisma.streams.findMany();
    res.status(200).send(stream);
  } catch (err) {
    console.log(err);
    res.status(401).send("Error");
  }
});

publicRouter.get("/subjects", async (req, res) => {
  try {
    const stream = await prisma.subject.findMany();
    res.status(200).send(stream);
  } catch (err) {
    console.log(err);
    res.status(401).send("Error");
  }
});

module.exports = publicRouter;
