import React, { Component } from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import * as R from 'ramda'
import Dialog from '../../../helper/components/dialog'
// helpers
import {
  userGetForm,
  getTestResult,
  downloadPdf,
} from '../../../helper/functions/requestHandler'
import timingUtil from './timing'
import { saveBlobToDisk } from '../../../helper/functions/download'
// component
import Form from '../../../helper/components/form'
import Icon from '../../../helper/components/Icon'
// // assets
import Pencil from '../../../assets/sound_fx/pencil.mp3'
import Eraser from '../../../assets/sound_fx/eraser.mp3'
import InsertChart from '@material-ui/icons/InsertChart'
import Download from '@material-ui/icons/GetApp'

// // CONST
import { FILL, REMOVE } from '../../../helper/functions/constants'
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
      isDialogOpen: false,
      fileName: '',
    }
    this.timer = timingUtil()
    this.changeAnswer = this.changeAnswer.bind(this)
    this.send = this.send.bind(this)
  }

  componentDidMount() {
    const { formId } = this.props
    userGetForm(formId).then(({ name, questionsNumber }) => {
      this.setState({
        questions: R.map(R.always(null), R.range(0, questionsNumber)),
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

    getTestResult({ formId, answers: questions, computeRanking }).then(
      ({ rank, percentage, fileName }) => {
        this.setState({
          hasTestResult: true,
          testInfo: { rank, percentage },
          fileName,
          isDialogOpen: true,
        })
      },
    )
  }

  handleDialog(type) {
    this.setState({ isDialogOpen: type === 'OPEN' })
  }

  // snackBar
  snackBarHandler(open = false) {
    if (open) this.setState({ isSnackBarOpen: open })
    else this.setState({ isSnackBarOpen: open })
  }

  render() {
    const {
      formName,
      questions,
      isSnackBarOpen,
      hasTestResult,
      testInfo,
      isDialogOpen,
      fileName,
    } = this.state
    return (
      <div>
        <Form
          disableUpload
          formName={formName}
          questions={questions}
          openSnackBar={isSnackBarOpen}
          sendForm={this.send}
          snackBarHandler={this.snackBarHandler}
          changeAnswer={this.changeAnswer}
        />
        {hasTestResult && (
          <div>
            <Icon
              icon={<InsertChart />}
              onClick={() => this.handleDialog('OPEN')}
            />
            {fileName && (
              <Icon
                icon={<Download />}
                onClick={() =>
                  downloadPdf(fileName).then(blob =>
                    saveBlobToDisk(blob, fileName),
                  )
                }
              />
            )}
            <Dialog
              open={isDialogOpen}
              handleClose={() => this.handleDialog('CLOSE')}
              formName={formName}
              testInfo={testInfo}
            />
          </div>
        )}
      </div>
    )
  }
}

StudentForm.propTypes = {
  formId: PropTypes.string.isRequired,
  disableSound: PropTypes.bool,
}

StudentForm.defaultProps = { disableSound: false }

export default StudentForm
