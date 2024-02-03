import joi from 'joi';

const createPurposeValidation = joi.object({
    purpose: joi.string().max(100).required(),
})

const updatePurposeValidation = joi.object({
    purposeId: joi.string().required(),
    purpose: joi.string().max(100).required(),
})

export { createPurposeValidation, updatePurposeValidation }
