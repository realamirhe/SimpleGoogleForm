// modules
const express = require('express')

// files
const router = require('./router')
const database = require('./database/database')

const port = 3000

const app = express()
database.connect('form_db')
app.use('/', router.Router)

app.listen(port, () => console.log(`listening to ${port}`))
