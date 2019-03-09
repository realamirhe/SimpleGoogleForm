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
const getPercentage = (correctAnswer, userAnswer) =>
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

const checkPassword = ({ username, password }) =>
  database
    .getUserPass()
    .then(
      authData =>
        authData[0].username === username && authData[0].password === password,
    )

router.post('/addNewForm', (req, res) =>
  upload(req, res, err =>
    checkPassword({
      username: req.body.username,
      password: req.body.password,
    }).then(access => {
      if (access) {
        if (err) console.log(err)
        database
          .addForm({
            name: req.body.name,
            answers: JSON.parse(req.body.answers),
          })
          .then(({ _id }) => {
            if (req.file)
              database
                .editFormFileName(_id, `${req.file.filename}`)
                .then(() => res.send({ id: _id }))
                .catch(error => res.status(500).send(error))
            else res.send({ id: _id })
          })
          .catch(error => res.status(500).send(error))
      } else res.status(403).send('access denied')
    }),
  ),
)

router.post('/editForm', (req, res) =>
  upload(req, res, err =>
    checkPassword({
      username: req.body.username,
      password: req.body.password,
    }).then(access => {
      if (access) {
        if (err) console.log(err)
        database
          .editForm({
            name: req.body.name,
            formId: req.body.formId,
            answers: JSON.parse(req.body.answers),
          })
          .then(() => {
            if (req.file)
              database
                .editFormFileName(req.body.formId, `${req.file.filename}`)
                .then(() => res.send('seccessful'))
                .catch(error => res.status(500).send(error))
            else res.send('seccessful')
          })
          .catch(error => res.status(500).send(error))
      } else res.status(403).send('access denied')
    }),
  ),
)

router.post('/getTestResult', (req, res) => {
  const userId = requestIp.getClientIp(req)
  const {
    body: { formId, answers: userAnswer, computeRanking },
  } = req
  database
    .getFormAnswersById(formId)
    .then(({ answers, userList, fileName }) => {
      const percentage = getPercentage(answers, userAnswer)
      if (computeRanking && !R.contains(userId, userList)) {
        database
          .saveAnswer(formId, percentage, userId)
          .then(
            res.send({
              rank: `${binarySearch(
                percentageList,
                percentage,
                0,
                percentageList.length - 1,
              ) || 1} of ${percentageList.length + 1}`,
              percentage,
              fileName,
            }),
          )
          .catch(error => res.status(500).send(error))
      } else res.send({ percentage, fileName })
    })
    .catch(err => res.status(500).send(err))
})

router.post('/userGetForm', ({ body: { formId } }, res) =>
  database
    .getFormById(formId)
    .then(({ answers, name }) =>
      res.send({ name, questionsNumber: answers.length }),
    )
    .catch(err => res.status(500).send(err)),
)

router.get('/getForms', ({ query }, res) =>
  checkPassword(query).then(access =>
    access
      ? database
          .getForms()
          .then(result => res.send({ result }))
          .catch(err => res.status(500).send(err))
      : res.status(403).send('access denied'),
  ),
)

router.post('/adminGetForm', ({ body: { formId, username, password } }, res) =>
  checkPassword({ username, password }).then(access =>
    access
      ? database
          .getFormById(formId)
          .then(({ answers, name, fileName }) =>
            res.send({ name, answers, fileName }),
          )
          .catch(err => res.status(500).send(err))
      : res.status(403).send('access denied'),
  ),
)

router.post('/signin', ({ body }, res) =>
  checkPassword(body).then(correct => res.send({ correct })),
)

router.post(
  '/changePassword',
  ({ body: { password, username, newPassword } }, res) =>
    checkPassword({ username, password }).then(access =>
      access
        ? database
            .setUserPass({ username, newPassword })
            .then(() => res.send({ msg: 'seccessful' }))
        : res.status(403).send('access denied'),
    ),
)

router.get('/downloadPdf', ({ query: { fileName } }, res) =>
  res.download(path.resolve(`./src/files/${fileName}`)),
)

exports.Router = router
