import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import connectToMongo from "./config/mongo.js";
import userRouter from "./routes/userRouter.js";
import noteRouter from "./routes/noteRouter.js";
import swaggerMiddleware from "./middlewares/swaggerMiddleware.js";

const app = express();
dotenv.config();
connectToMongo();

app.use(bodyParser.json());
app.use(cors());
app.use("/api", cors(), userRouter);
app.use("/api", cors(), noteRouter);
app.use("/", cors(), ...swaggerMiddleware());

app.listen(process.env.PORT || 3000);
