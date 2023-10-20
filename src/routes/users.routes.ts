//cái này để lưu những gì liên quan tới user
import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, resgisterValidator } from '~/middlewares/users.middleware'
const usersRoute = Router()

usersRoute.get('/login', loginValidator, loginController)

/*
Description: Register new user
Path: /register
Method: POST
body: {
    name: string
    email: string
    password: string
    confirm_password: string
    date_of_birth: string theo chuẩn ISO 8601 
}
*/

usersRoute.post('/register', resgisterValidator, registerController) //register: kt email, pwd, lỗi

export default usersRoute
