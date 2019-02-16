const mongoose = require('mongoose')

const { Schema } = mongoose

const formSchema = new Schema({
  name: String,
  answers: Array,
  fileName: String,
  rankingList: Array,
  userParticipated: Array,
})

exports.Form = mongoose.model('form', formSchema)
