const mongoose = require('mongoose')
const models = require('./databaseModel')

exports.connect = dbName => {
  mongoose.connect(
    // `mongodb://hoseinNorouzi:wfTN-2Eb4iNKMGW@cluster0-shard-00-00-2dpuf.mongodb.net:27017,cluster0-shard-00-01-2dpuf.mongodb.net:27017,cluster0-shard-00-02-2dpuf.mongodb.net:27017/${dbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`,
    `mongodb://localhost/${dbName}`,
    { useNewUrlParser: true },
  )

  const db = mongoose.connection
  db.on('error', () => console.log('can not connect to mongo db'))
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
