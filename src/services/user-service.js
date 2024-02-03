import bcrypt from 'bcrypt';
import prisma from "../database.js"
import { ResponseError } from "../err/err-response.js"
import { loginUserValidation, registerUserValidation } from "../validation/user-schema.js"
import { validation } from "../validation/validation.js"

const register = async (request) => {
    const data = validation(registerUserValidation, request)

    const countUsername = await prisma.user.count({
        where: { username: data.username }
    })

    if (countUsername > 0) {
        throw new ResponseError(400, "Username already exists")
    }

    data.role = "USER"
    data.password = await bcrypt.hash(data.password, 10)

    return prisma.user.create({
        data,
        select: { username: true, name: true },
    })
}

const login = async (request) => {
    const data = validation(loginUserValidation, request)

    const getUser = await prisma.user.findFirst({
        where: { username: data.username },
      });
      if (!getUser) {
        throw new ResponseError(401, "Username or Password is Wrong!");
      }
    
      const validatePassword = await bcrypt.compare(data.password, getUser.password);
      if (!validatePassword) {
        throw new ResponseError(401, "Username or Password is Wrong!");
      }

      return { username: getUser.username, name: getUser.name,}
}

const getALl = async () => {
  return prisma.user.findMany()
}

export default { register, login, getALl }
