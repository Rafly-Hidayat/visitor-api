import prisma from "../database.js";
import { ResponseError } from "../err/err-response.js";
import { validation } from "../validation/validation.js";
import { createVisitorValidation, outVisitorValidation } from "../validation/visitor-schema.js";

const create = async (request) => {
    const data = validation(createVisitorValidation, request)

    return prisma.visitor.create({
        data
    })
}

const out = async (request) => {
    const data = validation(outVisitorValidation, request)

    const visitor = await prisma.visitor.findUnique({
        where: { visitorId: data.visitorId, dateOut: null },
    })

    if (!visitor) {
        throw new ResponseError(404, "visitor not found")
    }

    return prisma.visitor.update({
        data,
        where: { visitorId: visitor.visitorId },
    })
}

const getALl = async () => {
    return prisma.visitor.findMany()
}

const getIdCard = async (visitorId) => {
    const visitor = await prisma.visitor.findUnique({
        where: { visitorId },
    })

    if (!visitor) {
        throw new ResponseError(404, "visitor not found")
    }

    return visitor.idCard
}

export default { create, out, getALl, getIdCard }
