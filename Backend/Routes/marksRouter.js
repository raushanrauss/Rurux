const express = require("express");
const marksRouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
marksRouter.get("/", async (req, res) => {
  try {
   
    const mark = await prisma.marks.findMany();
    res.status(200).send(mark);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});


marksRouter.post("/add", async (req, res) => {
  try {
    const { studentName, stream, marks, subjects } = req.body;
    const mark = await prisma.marks.create({
      data: {
        studentName,
        marks,
        subjects,
        stream,
      },
    });
    res.status(200).send(mark);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

marksRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mark = await prisma.marks.delete({
   where:{
    id:parseInt(id)
   },
    });
    res.status(200).send(mark);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

marksRouter.patch("/update/:id", async (req, res) => {
  try {
    const {id}=req.params;
    const { studentName, stream, marks, subjects } = req.body;
    const mark = await prisma.marks.update({
        where :{
            id: parseInt(id)
        },
      data: {
        studentName,
        marks,
        subjects,
        stream,
      },
    });
    res.status(200).send(mark);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});
module.exports=marksRouter;
