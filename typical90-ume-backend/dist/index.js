"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const submission_controller_1 = require("./controllers/submission.controller");
const app = (0, express_1.default)();
const port = 3000;
const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)());
app.set("json spaces", 2);
app.get("/submissions/:userId", (0, cors_1.default)(corsOptions), submission_controller_1.getSubmissions);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map