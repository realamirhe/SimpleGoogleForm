import request from 'superagent'
// Config
import config from '../../setup/config'

// admin panel #######################################

const getForms = () =>
  request
    .get(config.server + '/getForms')
    .set('Access-Control-Allow-Origin', '*')
    .then(res => res.body) // array of {formName, fromId}

const signIn = (username, password) =>
  request
    .post(config.server + '/signin')
    .set('Access-Control-Allow-Origin', '*')
    .send({ username, password })
    .then(res => res.body) // ({correct})

const adminGetForm = formId =>
  request
    .get(config.server + '/adminGetForm')
    .set('Access-Control-Allow-Origin', '*')
    .query({ formId })
    .then(res => res.body) // { name, questionsNumber }

const makeForm = formData =>
  // ({name, answers, ...file})
  request
    .post(config.server + '/addNewForm')
    .set('Access-Control-Allow-Origin', '*')
    .send(formData)
    .then(res => res.body) // ({id})

const editForm = formData =>
  // ({fileId, name, answers, ...file})
  request
    .post(config.server + '/editForm')
    .set('Access-Control-Allow-Origin', '*')
    .send(formData)
    .then(console.log)

// user panel #######################################
const userGetForm = formId =>
  request
    .get(config.server + '/userGetForm')
    .set('Access-Control-Allow-Origin', '*')
    .query({ formId })
    .then(res => res.body) // { name, questionsNumber }

const getTestResult = data =>
  // ({formId, userId, answers, computeRanking})
  request
    .get(config.server + '/getTestResult')
    .set('Access-Control-Allow-Origin', '*')
    .send(data)
    .then(res => res.body) // {rank, persentage, fileName}  ======> rank perhapse is null

export {
  userGetForm,
  getTestResult,
  signIn,
  makeForm,
  getForms,
  adminGetForm,
  editForm,
}
