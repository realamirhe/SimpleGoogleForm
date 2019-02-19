// modules
import request from 'superagent'
import * as R from 'ramda'
// Config
import config from '../../setup/config'

// admin panel #######################################

const getForms = () =>
  request
    .get(config.server + '/getForms')
    .set('Access-Control-Allow-Origin', '*')
    .then(R.prop('body')) // {result : [{_id, name}, ....]}

const signIn = (username, password) =>
  request
    .post(config.server + '/signin')
    .send({ username, password })
    .set('Access-Control-Allow-Origin', '*')
    .then(R.path(['body', 'correct']))
// ({correct})

const adminGetForm = formId =>
  request
    .get(config.server + '/adminGetForm')
    .set('Access-Control-Allow-Origin', '*')
    .query({ formId })
    .then(R.prop('body')) // { name, questionsNumber }

const makeForm = formData =>
  // ({name, answers, ...file})
  request
    .post(config.server + '/addNewForm')
    .set('Access-Control-Allow-Origin', '*')
    .send(formData)
    .then(R.prop('body')) // ({id})

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
    .then(R.prop('body')) // { name, questionsNumber }

const getTestResult = data =>
  // ({formId, userId, answers, computeRanking})
  request
    .get(config.server + '/getTestResult')
    .set('Access-Control-Allow-Origin', '*')
    .send(data)
    .then(R.prop('body')) // {rank, persentage, fileName}  ======> rank perhapse is null

export {
  userGetForm,
  getTestResult,
  signIn,
  makeForm,
  getForms,
  adminGetForm,
  editForm,
}
