"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubmissions = void 0;
const submission_1 = require("../databases/submission");
const getSubmissions = (userId) => {
    return (0, submission_1.readSubmissionsFromDb)(userId);
};
exports.getSubmissions = getSubmissions;
//# sourceMappingURL=submission.service.js.map