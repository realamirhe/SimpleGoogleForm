const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database/database')
const multer = require('multer')
const R = require('ramda')
const path = require('path')
const requestIp = require('request-ip')

// multer setup
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, './src/files'),
  filename: (_, file, callback) =>
    callback(null, Date.now().toString() + path.extname(file.originalname)),
})
const upload = multer({ storage }).single('pdf')

// router setup
const router = express.Router()
router.use(bodyParser.json())

// helper Functions
const getPersentage = (correctAnswer, userAnswer) =>
  R.compose(
    result => (result / (correctAnswer.length * 3)) * 100,
    R.addIndex(R.reduce)(
      (result, ans, index) =>
        ans === correctAnswer[index] ? result + 3 : !ans ? result : result - 1,
      0,
    ),
  )(userAnswer)

const binarySearch = (data, target, start, end) => {
  const middle = Math.floor((start + end) / 2)
  if (target == data[middle]) {
    return data.length - middle
  }
  if (end - 1 === start)
    return Math.abs(data[start] - target) > Math.abs(data[end] - target)
      ? data[end]
      : data[start]
  if (target > data[middle]) return binarySearch(data, target, middle, end)
  if (target < data[middle]) return binarySearch(data, target, start, middle)
}

router.post('/addNewForm', (req, res) =>
  upload(req, res, err => {
    if (err) console.log(err)
    database
      .addForm(JSON.parse(req.body.data))
      .then(({ _id }) => {
        if (req.file)
          database
            .editFormFileName(_id, `${req.file.filename}`)
            .then(() => console.log({ id: _id }) || res.send({ id: _id }))
            .catch(error => res.status(500).send(error))
        else console.log({ id: _id }) || res.send({ id: _id })
      })
      .catch(error => res.status(500).send(error))
  }),
)

router.post('/editForm', (req, res) =>
  upload(req, res, err => {
    if (err) console.log(err)
    const data = JSON.parse(req.body.data)
    database
      .editForm(data)
      .then(() => {
        if (req.file)
          database
            .editFormFileName(data.formId, `${req.file.filename}`)
            .then(() => res.send('seccessful'))
            .catch(error => res.status(500).send(error))
        else res.send('seccessful')
      })
      .catch(error => res.status(500).send(error))
  }),
)

router.get('/getTestResult', (req, res) => {
  // const userId = requestIp.getClientIp(req)
  const {
    body: { formId, answers: userAnswer, userId, computeRanking },
  } = req

  database
    .getFormAnswersById(formId)
    .then(({ answers, userList, fileName }) => {
      const persentage = getPersentage(answers, userAnswer)
      if (computeRanking && !R.contains(userId, userList)) {
        database
          .saveAnswer(formId, persentage, userId)
          .then(({ percentageList }) =>
            res.send({
              rank:
                binarySearch(
                  percentageList,
                  persentage,
                  0,
                  percentageList.length - 1,
                ) || 1,
              persentage,
              fileName,
            }),
          )
          .catch(error => res.status(500).send(error))
      } else res.send({ persentage, fileName })
    })
    .catch(err => res.status(500).send(err))
})

router.get('/userGetForm', ({ body: { formId } }, res) =>
  database
    .getFormById(formId)
    .then(({ answers, name }) =>
      res.send({ name, questionsNumber: answers.length }),
    )
    .catch(err => res.status(500).send(err)),
)

router.get('/getForms', (_, res) =>
  database
    .getForms()
    .then(result => res.send({ result }))
    .catch(err => res.status(500).send(err)),
)

router.get('/adminGetForm', ({ body: { formId } }, res) =>
  database
    .getFormById(formId)
    .then(({ answers, name, fromName }) =>
      res.send({ name, answers, fromName }),
    )
    .catch(err => res.status(500).send(err)),
)

router.get('/signin', ({ body: { username, password } }, res) =>
  res.send({ correct: password === '12345678' && username === 'admin' }),
)

router.get('/downloadPdf/:fileName', ({ params: { fileName } }, res) =>
  res.download(path.resolve(`./src/files/${fileName}`)),
)

exports.Router = router
