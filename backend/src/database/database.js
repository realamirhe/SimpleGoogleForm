const mongoose = require('mongoose')
const models = require('./databaseModel')

exports.connect = dbName => {
  mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true })

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
    'answers percentageList userList fileName',
  )

exports.saveAnswer = (formId, persentage, userId) =>
  models.Form.findOneAndUpdate(
    { _id: formId },
    {
      $push: {
        percentageList: { $each: [persentage], $sort: 1 },
        userList: userId,
      },
    },
  ).select('percentageList')

exports.getFormById = id =>
  models.Form.findOne({ _id: id }).select('name answers')
