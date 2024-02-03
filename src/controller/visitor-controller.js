import visitorService from "../services/visitor-service.js";
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const create = async (req, res, next) => {
    try {
        const idCard = req.file?.path
        const request = req.body
        request.idCard = idCard

        const result = await visitorService.create(request)
        res.status(200).json({
            message: "Successfully create visitor",
            data: result,
        })
    } catch (error) {
        next(error);
    }
}

const out = async (req, res, next) => {
    try {
        const visitorId = req.params.visitorId
        const request = req.body
        request.visitorId = visitorId

        const result = await visitorService.out(request)
        res.status(200).json({
            message: "Successfully take out visitor",
            data: result,
        })
    } catch (error) {
        next(error);
    }
}

const getAll = async (req, res, next) => {
    try {
        const result = await visitorService.getALl()
        res.status(200).json({
            message: "Successfully get all visitor",
            data: result,
        })
    } catch (error) {
        next(error);
    }
}

const getIdCard = async (req, res, next) => {
    try {
        const result = await visitorService.getIdCard(req.params.visitorId)

        const pathImage = path.join(__dirname, '../..', result);
        if (!fs.existsSync(pathImage)) {
            throw new ResponseError(400, "Could not find image");
        }

        res.sendFile(pathImage)
    } catch (error) {
        next(error);
    }
}

export default { create, out, getAll, getIdCard }
