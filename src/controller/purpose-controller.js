import purposeService from "../services/purpose-service.js";

const create = async (req, res, next) => {
    try {
        const result = await purposeService.create(req.body)
        res.status(200).json({
            message: "Successfully create purpose",
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const getALl = async (req, res, next) => {
    try {
        const result = await purposeService.getALl()
        res.status(200).json({
            message: "Successfully get all purpose",
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const purposeId = req.params.purposeId
        const request = req.body
        request.purposeId = purposeId

        const result = await purposeService.update(request)
        res.status(200).json({
            message: "Successfully update purpose",
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        await purposeService.remove(req.params.purposeId)
        res.status(200).json({
            message: "Successfully remove purpose",
            data: null
        })
    } catch (error) {
        next(error);
    }
}

export default { create, getALl, update, remove }
