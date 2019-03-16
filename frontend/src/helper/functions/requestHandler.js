// modules
import request from 'superagent'
import * as R from 'ramda'
// Config
import config from '../../setup/config'
// helper
import { load } from './localStorage'
// admin panel #######################################

const getForms = () =>
  request
    .get(config.server + '/getForms')
    .query({
      username: load('username'),
      password: load('password'),
    })
    .set('Access-Control-Allow-Origin', '*')
    .then(R.path(['body', 'result'])) // {result : [{_id, name}, ....]}

const signIn = (username, password) =>
  request
    .post(config.server + '/signin')
    .send({ username, password })
    .set('Access-Control-Allow-Origin', '*')
    .then(R.path(['body', 'correct'])) // ({correct})

const changePassword = newPassword =>
  request
    .post(config.server + '/changePassword')
    .send({
      username: load('username'),
      password: load('password'),
      newPassword,
    })
    .set('Access-Control-Allow-Origin', '*')
    .then(R.path(['body', 'msg'])) // ({msg})

const adminGetForm = formId =>
  request
    .post(config.server + '/adminGetForm')
    .set('Access-Control-Allow-Origin', '*')
    .send({
      formId,
      username: load('username'),
      password: load('password'),
    })
    .then(R.prop('body')) // {name, answers, fileName}

const makeForm = formData => {
  // ({name, answers, ...file})
  formData.append('username', load('username'))
  formData.append('password', load('password'))
  return request
    .post(config.server + '/addNewForm')
    .set('Access-Control-Allow-Origin', '*')
    .send(formData)
    .then(R.prop('body')) // ({_id, name})
}

const editForm = formData => {
  // ({fileId, name, answers, ...file})
  formData.append('username', load('username'))
  formData.append('password', load('password'))
  return request
    .post(config.server + '/editForm')
    .set('Access-Control-Allow-Origin', '*')
    .send(formData)
}

const deleteForm = formId =>
  request
    .post(config.server + '/deleteForm')
    .set('Access-Control-Allow-Origin', '*')
    .send({
      formId,
      username: load('username'),
      password: load('password'),
    })
    .then(R.path(['body', 'msg'])) // ({msg})

// user panel #######################################

const userGetForm = formId =>
  request
    .post(config.server + '/userGetForm')
    .set('Access-Control-Allow-Origin', '*')
    .send({
      formId,
      username: load('username'),
      password: load('password'),
    })
    .then(R.prop('body')) // { name, questionsNumber }

const getTestResult = data =>
  // ({formId, userId, answers, computeRanking})
  request
    .post(config.server + '/getTestResult')
    .set('Access-Control-Allow-Origin', '*')
    .send(data)
    .then(R.prop('body')) // {rank, persentage, fileName}  ======> rank perhapse is null

const downloadPdf = fileName =>
  request
    .get(config.server + '/downloadPdf')
    .set('Access-Control-Allow-Origin', '*')
    .query({ fileName })
    .on('request', function callback() {
      this.xhr.responseType = 'blob'
    })
    .then(R.path(['xhr', 'response']))

export {
  userGetForm,
  getTestResult,
  signIn,
  makeForm,
  getForms,
  adminGetForm,
  editForm,
  downloadPdf,
  changePassword,
  deleteForm,
}
