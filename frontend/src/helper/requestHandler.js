import request from 'superagent'
// Config
// import config from '../config'

// getForms: get name of all Forms for First lookup page
const getForms = () => {}

// get meta form info := { question_count, answer_file_name if existed otherwise False }
const getForm = formId => {}

const getAccuracy = (formId, userId) => {}

// get answer file if existed in dataset send a link or file
const getAnswerFile = formId => {}

const sendQuestionAnswer = (formId, userId) => (questionNumber, answer) => {}

// sendFormInfo: name, question count, [answers], pdf file [optional]
const sendFormInfo = fromName => {}

export {
  getForms,
  getForm,
  getAccuracy,
  getAnswerFile,
  sendQuestionAnswer,
  sendFormInfo,
}
