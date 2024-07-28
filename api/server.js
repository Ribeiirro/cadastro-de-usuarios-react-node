import express from "express"
import cors from "cors";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors(
  // {
  //   origin: "http://localhost:5173", // <-- allow requests from this origin
  //   methods: "GET, POST, PUT, DELETE",
  //   credentials: true, // <-- allow sending cookies over requests
  // }
));


app.get("/usuarios", async (req, res) => {
  let users = [];

  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        age: req.query.age,
        name: req.query.name,
        email: req.query.email,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }

  res.status(200).json(users);
});

app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      age: req.body.age,
      name: req.body.name,
      email: req.body.email,
    },
  });

  res.status(201).json(req.body);
});

app.put("/usuarios/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      age: req.body.age,
      name: req.body.name,
      email: req.body.email,
    },
  });

  res.status(201).json(req.body);
});

app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  return res.status(200).json({
    message: "User deleted successfully!",
  });
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log(`Server is running on port ${port}`);
