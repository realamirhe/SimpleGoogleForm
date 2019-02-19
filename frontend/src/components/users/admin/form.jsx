import React, { Component } from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import { update, map, always, range, any, isNil } from 'ramda'
// helpers
import {
  editForm,
  makeForm,
  adminGetForm,
} from '../../../helper/functions/requestHandler'
import { REMOVE } from '../../../helper/functions/constants'
// component
import Form from '../../../helper/components/form'

class AdminForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // form initial data
      questionCount: props.initialQuestionCount,
      questions: null,
      formId: props.formId,
      formName: props.formName,

      solution: props.initialSolution,
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

  componentDidMount() {
    const { formId, questionCount } = this.state
    if (this.editMode) {
      adminGetForm(formId).then(({ name, answers, fileName }) => {
        this.setState({
          question: answers,
          formName: name,
          solution: fileName,
          questionCount: answers.length,
        })
      })
    } else {
      this.setState({ questions: map(always(null), range(0, questionCount)) })
    }
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

  // File
  handleSelectedFile(event) {
    this.setState({
      selectedFile: event.target.files[0],
    })
  }

  // snackBar
  snackBarHandler(open = false) {
    if (open) this.setState({ isSnackBarOpen: open })
    else this.setState({ isSnackBarOpen: open })
  }

  // render
  render() {
    const { formName, questions, isSnackBarOpen } = this.state
    return (
      <Form
        formName={formName}
        questions={questions}
        openSnackBar={isSnackBarOpen}
        onFileUpload={this.handleSelectedFile}
      />
    )
  }
}
AdminForm.propTypes = {
  initialQuestionCount: PropTypes.number,
  formId: PropTypes.string,
  formName: PropTypes.string,
  initialSolution: PropTypes.string,
}

AdminForm.defaultProps = {
  initialQuestionCount: 0,
  formId: '',
  formName: '',
  initialSolution: '',
}

export default AdminForm
