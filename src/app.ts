import "reflect-metadata";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createConnection } from "typeorm";

import userRoutes from "./routes/user.routes";

const app = express();
const PORT: number = 4000;
createConnection();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server up and running at http://localhost:${PORT}`);
});
