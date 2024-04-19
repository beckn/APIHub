import express, { Express, Request, Response } from "express";
import { startServer } from "./app";
import dotenv from "dotenv";

dotenv.config();
const PORT: string = process.env.PORT || "3000";
const app: Express = express();
const appInstance = startServer(app);

appInstance.listen(PORT, () => {
  console.log(`Server Started on PORT:${PORT}`);
});
