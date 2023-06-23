"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSubmissionsFromDb = void 0;
const client_1 = require("@prisma/client");
const readSubmissionsFromDb = async (userId) => {
    try {
        const prisma = new client_1.PrismaClient();
        const submissions = await prisma.submissions.findMany({
            where: {
                user_id: userId,
            },
        });
        return submissions;
    }
    catch (err) {
        console.log(err);
        // TODO
    }
};
exports.readSubmissionsFromDb = readSubmissionsFromDb;
//# sourceMappingURL=submission.js.map