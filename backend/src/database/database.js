const mongoose = require('mongoose')
const models = require('./databaseModel')

exports.connect = dbName => {
  mongoose.connect(`mongodb://localhost/${dbName}`)

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'Connection error:'))
  db.once('open', () => console.log(`Connected to ( ${dbName} ) database!`))
}

exports.addForm = (newForm, fileName) =>
  new models.Form({
    name: newForm.name,
    answers: newForm.answers,
    fileName,
  }).save()

exports.getFormAnswersById = id =>
  models.Form.findOne({ _id: id }).select(
    'answers rankingList userParticipated',
  )

exports.saveAnswer = (formId, persentage) =>
  models.Form.findAndUpdate(
    { _id: formId },
    { $push: { rankingList: { $each: [persentage], $sort: 1 } } },
  ).select('rankingList')

exports.getFormById = id =>
  models.Form.findOne({ _id: id }).select('name answers')
