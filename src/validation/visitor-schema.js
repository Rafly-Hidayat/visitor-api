import joi from "joi";

const createVisitorValidation = joi.object({
    name: joi.string().max(100).required(),
    resident: joi.string().max(100).required(),
    idCard: joi.string().required(),
    dateIn: joi.string().required(),
})

const outVisitorValidation = joi.object({
    visitorId: joi.string().required(),
    dateOut: joi.string().required(),
})

export { createVisitorValidation, outVisitorValidation }
