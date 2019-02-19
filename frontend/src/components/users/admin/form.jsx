import React, { Component } from 'react'
// third-party-packages
import { update, map, always, range, any, isNil } from 'ramda'
// helpers
import { REMOVE } from '../../functions/constants'
import { editForm, makeForm } from '../../../helper/functions/requestHandler'

class AdminForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // form initial data
      questionCount: props.initialQuestionCount,
      questions: props.initialQuestions,
      formId: props.formId,
      formName: props.formName,
      // file
      selectedFile: null,
      // user experience
      isSnackBarOpen: false,
    }

    this.editMode = !!props.formId

    this.changeAnswer = this.changeAnswer.bind(this)
    this.sendForm = this.sendForm.bind(this)

    this.snackBarHandler = this.snackBarHandler.bind(this)
    this.handleSelectedFile = this.handleSelectedFile.bind(this)
  }
  // Form
  initialization({ questionCount, formName }) {
    const questions = map(always(null), range(0, questionCount))
    this.setState({ questions, questionCount, formName })
  }
  changeAnswer(index) {
    return newValue => type => () => {
      const answer = type === REMOVE ? null : newValue
      this.setState(({ questions }) => ({
        questions: update(index, answer, questions),
      }))
    }
  }

  // File
  handleSelectedFile(event) {
    console.log('event.target.files[0]', event.target.files[0])
    this.setState({
      selectedFile: event.target.files[0],
    })
  }

  // snackBar
  snackBarHandler(open = false) {
    if (open) this.setState({ isSnackBarOpen: open })
    else this.setState({ isSnackBarOpen: open })
  }

  send() {
    const { formName, formId, questions, selectedFile } = this.state
    if (any(isNil, questions)) {
      this.snackBarHandler(true)
      return
    }
    if (this.editMode) {
      editForm({
        formId,
        name: formName,
        answers: questions,
        file: selectedFile,
      })
    } else {
      makeForm({
        name: formName,
        answers: selectedFile,
        file: selectedFile,
      })
    }
  }

  render() {
    return <div />
  }
}
AdminForm.propTypes = {}
AdminForm.defaultProps = {}
