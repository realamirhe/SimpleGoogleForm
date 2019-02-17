const mongoose = require('mongoose')
const models = require('./databaseModel')

exports.connect = dbName => {
  mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true })

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'Connection error:'))
  db.once('open', () => console.log(`Connected to ( ${dbName} ) database!`))
}

exports.addForm = ({ name, answers }) =>
  new models.Form({
    name,
    answers,
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
  models.Form.findOne({ _id: id }).select('name answers fileName ')

exports.editForm = ({ formId, answers, name }) =>
  models.Form.updateOne({ _id: formId }, { $set: { name, answers } })

exports.editFormFileName = (formId, fileName) =>
  models.Form.updateOne({ _id: formId }, { $set: { fileName } })

exports.getForms = () => models.Form.find({}).select('name _id')
