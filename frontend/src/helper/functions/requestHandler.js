import request from 'superagent'
// Config
// import config from '../setup/config'

// e -r * e/4*r
// get array of {formName, fromId}
const getForms = () => {}

// Number of Questions, Test Name
const getForm = formId => {}

// Array of answers, Test Percentage, ranking, Pdf Answer link
const getTestResult = (formId, userId, answerArray) => {}

// get authenticated in application
const signIn = (username, password) => {}

// request for making form in back end return '.../forms/:formId'
const makeForm = (formName, answerArray, pdfFile) => {}

export { getForm, getTestResult, signIn, makeForm, getForms }
