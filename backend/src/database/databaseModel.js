const mongoose = require('mongoose')

const { Schema } = mongoose

const formSchema = new Schema({
  name: String,
  answers: Array,
  fileName: String,
  percentageList: Array,
  userList: Array,
})

exports.Form = mongoose.model('form', formSchema)
