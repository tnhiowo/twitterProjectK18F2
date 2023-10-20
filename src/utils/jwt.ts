import jwt from 'jsonwebtoken'

//làm hàm nhận vào payload, priviteKey, options từ đó ký tên

export const signToken = ({
  //biến thành obj để tránh ng dùng truyền lung tung
  payload,
  privateKey = process.env.JWT_SECRET as string, //chữ ký mặc định
  options = { algorithm: 'HS256' }
}: {
  payload: string | object | Buffer
  privateKey?: string //thêm dấu ? để option để tự thêm mật khẩu mặc định
  options: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) throw reject(err)
      resolve(token as string)
    })
  })
}
