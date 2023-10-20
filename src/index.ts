import express from 'express'
import usersRoute from './routes/users.routes'
import databaseService from './services/database.services'

const app = express()
app.use(express.json) //app handler

const PORT = 4000
databaseService.connect()
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', usersRoute)
//localhost:3000/api/tweets
//truy cập vào 3000 => hello word
// vào /api => usersRoute
// vào /tweets => data

//localhost:3000/users/tweets
//truy cập vào 3000 => hello word
// vào /users => loginValidator
// vào /tweets => data

app.listen(PORT, () => {
  console.log(`server đang chạy trên port ${PORT}`)
})
