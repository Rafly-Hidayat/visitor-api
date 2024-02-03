import userService from "../services/user-service.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body)
        res.status(200).json({
            message: "Successfully register a user",
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body)
        res.status(200).json({
            message: "Successfully logged in",
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const getAll = async (req, res, next) => {
    try {
        const result = await userService.getALl()
        res.status(200).json({
            message: "Successfully get all visitor",
            data: result,
        })
    } catch (error) {
        next(error);
    }
}

export default { register, login, getAll }
