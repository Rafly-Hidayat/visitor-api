import prisma from "../database.js"
import { ResponseError } from "../err/err-response.js"
import { createPurposeValidation, updatePurposeValidation } from "../validation/purpose-schema.js"
import { validation } from "../validation/validation.js"

const create = async (request) => {
    const data = validation(createPurposeValidation, request)

    const countPurpose = await prisma.purpose.count({
        where: { purpose: data.purpose }
    })

    if (countPurpose > 0) {
        throw new ResponseError(400, "Purpose already exists")
    }

    return prisma.purpose.create({
        data
    })
}

const getALl = async () => {
    return prisma.purpose.findMany({})
}

const update = async (request) => {
    const data = validation(updatePurposeValidation, request)

    const findPurpose = await prisma.purpose.findUnique({
        where: { purposeId: data.purposeId }
    })

    if (!findPurpose) {
        throw new ResponseError(404, "Purpose not found")
    }

    const countPurpose = await prisma.purpose.count({
        where: { purpose: data.purpose }
    })

    if (countPurpose > 0) {
        throw new ResponseError(400, "Purpose already exists")
    }

    return prisma.purpose.update({
        data,
        where: { purposeId: findPurpose.purposeId }
    })
}

const remove = async (purposeId) => {
    const findPurpose = await prisma.purpose.findUnique({
        where: { purposeId }
    })

    if (!findPurpose) {
        throw new ResponseError(404, "Purpose not found")
    }

    await prisma.purpose.delete({
        where: { purposeId }
    })
}

export default { create, getALl, update, remove }
