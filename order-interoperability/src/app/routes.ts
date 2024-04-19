import express, { Router } from "express";
import { getS3Url } from "./controller";

const router: Router = express.Router();

export const routes = () => {
  router.post("/get-s3-url", getS3Url);
  return router;
};
