import express, { Express, Request, Response } from "express";
import { routes } from "./routes";
import cors from "cors";
export const startServer = (app: Express) => {
  app.options(
    "*",
    cors<Request>({
      origin: "*",
      optionsSuccessStatus: 200,
      credentials: true,
      methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"]
    })
  );

  app.use(
    cors({
      origin: "*",
      methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"]
    })
  );
  app.use(express.urlencoded({ extended: true, limit: "200mb" }));
  app.use(express.json({ limit: "200mb" }));
  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });

  app.use("/", routes());
  return app;
};
