import * as dotenv from "dotenv";

import cors from "cors";
import express from "express";
import main_router from "./routes/main.router.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
app.use(
  cors({
    origin: "*"
  })
);
app.use(express.json());
app.use("/api", main_router);

const port = process.env.PORT || 3003;
app.listen(port, function () {
  console.log("App is running on port http://localhost:" + port);
});
