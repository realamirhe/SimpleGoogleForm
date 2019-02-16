const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database/database')
const multer = require('multer')
const R = require('ramda')
const path = require('path')

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
    result => result / (correctAnswer.length * 3),
    R.addIndex(R.reduce)(
      (result, ans, index) =>
        ans === correctAnswer[index] ? result + 3 : !ans ? result : result - 1,
      0,
    ),
  )(userAnswer)

const binarySearch = (data, target, start, end) => {
  const middle = Math.floor((start + end) / 2)
  if (target == data[middle]) return data[middle]
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
    if (!req.file) return res.status(400).send('no files were uploaded')
    database
      .addForm(JSON.parse(req.body.data), `${req.file.filename}`)
      .then(({ _id }) => res.send({ id: _id }))
      .catch(error => res.status(500).send(error))
  }),
)

router.get(
  '/getTestResult',
  ({ body, connection }, res) =>
    console.log({ ip: connection.remoteAddress }) ||
    database
      .getFormAnswersById(body.formId)
      .then(({ answers, userParticipated, fileName }) => {
        const persentage = getPersentage(answers, body.answers)
        console.log({ persentage })
        if (!R.contains(ip, userParticipated)) {
          database
            .saveAnswer(body.formId, persentage)
            .then(({ rankingList }) =>
              res.send({
                rank: binarySearch(
                  rankingList,
                  persentage,
                  0,
                  rankingList.length - 1,
                ),
                persentage,
                fileName,
              }),
            )
            .catch(error => res.status(500).send(error))
        } else res.send({ persentage, fileName })
      })
      .catch(err => res.status(500).send(err)),
)

router.get('/getForm', ({ body }, res) =>
  database
    .getFormById(body.formId)
    .then(({ answers, name }) =>
      res.send({ name, questionsSize: answers.length() }),
    )
    .catch(err => res.status(500).send(err)),
)

exports.Router = router
