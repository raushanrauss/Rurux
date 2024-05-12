const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const streamRouter = express.Router();
streamRouter.get("/",async(req,res)=>{
try{
  const stream=await prisma.streams.findMany();
  res.status(200).send(stream);
}
catch(err){
  console.log(err)
  res.status(401).send("Error")
}
})
streamRouter.post("/add", async (req, res) => {
  try {
    const { name } = req.body;
    const stream = await prisma.streams.create({
      data: {
        name,
      },
    });
    res.status(200).json(stream); 
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

streamRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const stream = await prisma.streams.delete({
      where: {
        id: parseInt(id)
      }
    });
    res.status(200).json(stream); // Assuming you want to send the deleted stream back
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

streamRouter.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const stream = await prisma.streams.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name
      }
    });
    res.status(200).json(stream); // Assuming you want to send the updated stream back
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

module.exports = streamRouter;
