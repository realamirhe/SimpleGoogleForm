import React, { Component } from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import * as R from 'ramda'
// helpers
import {
  userGetForm,
  getTestResult,
} from '../../../helper/functions/requestHandler'
import timingUtil from './timing'
// component
import Form from '../../../helper/components/form'
// // assets
import Pencil from '../../../assets/sound_fx/Pencil.mp3'
import Eraser from '../../../assets/sound_fx/eraser.mp3'
// // CONST
import { FILL, REMOVE } from '../../functions/constants'
// // instance helpers
const pencilPlayer = new Audio(Pencil)
const eraserPlayer = new Audio(Eraser)

/* Student Form */
class StudentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      formId: props.formId || '',
      startTime: 0,
      hasTestResult: false,
      formName: '',
      testInfo: {},
    }
    this.timer = timingUtil()
  }

  componentDidMount() {
    const { formId } = this.props
    userGetForm(formId).then(({ name, questionsNumber }) => {
      this.setState({
        question: R.map(R.always(null), R.range(0, questionsNumber)),
        startTime: new Date(),
        formName: name,
      })
    })
  }

  // Form
  changeAnswer(index) {
    const { disableSound } = this.props
    return newValue => type => () => {
      if (!disableSound && type === FILL) pencilPlayer.play()
      else if (!disableSound && type === REMOVE) eraserPlayer.play()
      const answer = type === REMOVE ? null : newValue
      this.setState(({ questions }) => ({
        questions: R.update(index, answer, questions),
      }))
    }
  }

  send() {
    const computeRanking = this.timer() < 5 ? false : true

    const { formId, questions } = this.state
    getTestResult({ formId, questions, computeRanking }).then(
      ({ rank, percentage, formName }) => {
        this.setState({
          hasTestResult: true,
          testInfo: { rank, percentage },
          formName,
        })
      },
    )
  }

  // snackBar
  snackBarHandler(open = false) {
    if (open) this.setState({ isSnackBarOpen: open })
    else this.setState({ isSnackBarOpen: open })
  }

  render() {
    const { formName, questions, isSnackBarOpen } = this.state
    return (
      <Form
        formName={formName}
        questions={questions}
        openSnackBar={isSnackBarOpen}
        sendForm={this.send}
        snackBarHandler={this.snackBarHandler}
        changeAnswer={this.changeAnswer}
      />
    )
  }
}

StudentForm.propTypes = {
  formId: PropTypes.string.isRequired,
}

export default StudentForm
