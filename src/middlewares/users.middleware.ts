//lưu tất cả middleware cần thiết trong users
//ta sẽ làm chức năng đăng nhập ./login
// thì khi mà đăng nhập thì client sẽ truy cập /login
// tạo ra 1 req, và bỏ vào trong đó email, password (bỏ vô body)
// nhét email, password vào trong req.body và gửi lên server
// //middleware có next
import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import usersService from '~/services/users.services'
import { validate } from '~/utils/validation'
// express cung cấp những interface: Request, Response, NextFunction
// giúp bổ nghĩa cho cái ở dưới
export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      message: 'Missing email or password'
      //return để code ngừng v mới hợp lý
      //400: lỗi do ng dùng gửi lên bị thiếu something
    })
  }
  next() //ko có lỗi thì chạy tiếp
}
export const resgisterValidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isString: true,
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 100
        }
      }
    },
    email: {
      notEmpty: true,
      isEmail: true,
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const isExist = await usersService.checkEmailExist(value)
          if (isExist) {
            throw new Error('Email already exists')
          }
          return true
        }
      }
    },
    password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 8,
          max: 50
        }
      },
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
          // returnScore: true //return thang diem 1-10
        }
      },
      errorMessage:
        'password mus be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
    },
    confirm_password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 8,
          max: 50
        }
      },
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
          // returnScore: true //return thang diem 1-10
        }
      },
      errorMessage:
        'confirm password mus be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      custom: {
        options: (value, { req }) => {
          //value: dai dien cho confirmpassword vì nó nằm trong confirmpassword, req: hiện tại của mình
          if (value !== req.body.password) {
            throw new Error('confirm_password does not matched password')
          }
          return true
        }
      }
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
)

//truyền thiếu lên postman vẫn thành công vì nó ko báo lỗi, phải tự lấy ra xài từ validate
