const mongoose = require('mongoose')

const { Schema } = mongoose

const formSchema = new Schema({
  name: String,
  answers: Array,
  fileName: String,
  percentageList: Array,
  userList: Array,
})

const authSchema = new Schema({
  username: String,
  password: String,
})

exports.Form = mongoose.model('form', formSchema)
exports.Auth = mongoose.model('auth', authSchema)
