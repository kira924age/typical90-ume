import express from "express";
import cors from "cors";

import { getSubmissions } from "./controllers/submission.controller";

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors());
app.set("json spaces", 2);

app.get("/submissions/:userId", cors(corsOptions), getSubmissions);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
