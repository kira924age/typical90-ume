import express from "express";
import cors from "cors";

import { getSubmissions } from "./controllers/submission.controller";

const app = express();
const port = 3000;

app.use(cors());
app.set("json spaces", 2);

app.get("/submissions/:userId", getSubmissions);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
