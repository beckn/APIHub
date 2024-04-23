import express, { Router } from "express";
import { createS3Url } from "./controller";

const router: Router = express.Router();

export const orderRoutes = () => {
  router.post("/", createS3Url);
  return router;
};
