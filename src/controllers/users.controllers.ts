import { Request, Response } from 'express'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'test@gmail.com' && password === '123456') {
    return res.json({
      message: 'Login successfull',
      result: [
        { name: 'Điệp', yob: 1999 },
        { name: 'Hùng', yob: 2003 },
        { name: 'Được', yob: 1994 }
      ]
    })
  }
  res.status(400).json({
    message: 'Login failed',
    result: []
  })
}
// controller ko có next, thường nằm cuối
//localhost:3000/api/tweets/login
//truy cập email và pwd

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  console.log('ahihi')
  const { email, password } = req.body
  try {
    const result = await usersService.register(req.body)
    return res.json({
      message: 'Register successfull',
      result
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Register failed',
      error
    })
  }
}
