// modules
const express = require('express')
const cors = require('cors')

// files
const router = require('./router')
const database = require('./database/database')

const port = process.env.PORT || 3001

const app = express()
database.connect('form_db')

app.use(
  cors({
    origin: '*',
    methods: 'GET,POST',
  }),
)
// app.use((_, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', '*')
//   next()
// })

app.use('/', router.Router)

app.listen(port, () => console.log(`listening to ${port}`))
