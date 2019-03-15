import React, { Component } from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import * as R from 'ramda'
import Dialog from '../../../helper/components/dialog'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
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
import AppBar from '../../../helper/components/appBar/appBar'
// // assets
import Pencil from '../../../assets/sound_fx/pencil.mp3'
import Eraser from '../../../assets/sound_fx/eraser.mp3'
import InsertChart from '@material-ui/icons/InsertChart'
import Download from '@material-ui/icons/GetApp'

// // CONST
import { FILL, REMOVE, TIME_LIMIT } from '../../../helper/functions/constants'
import Fab from '@material-ui/core/Fab'
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
    const computeRanking = this.timer() < TIME_LIMIT ? false : true
    const { formId, questions } = this.state
    /* ranking logic
    ranking only displayed when
    1. time should be more than limit
    2. it is first time test
    */

    getTestResult({ formId, answers: questions, computeRanking }).then(
      ({ rank, percentage, fileName }) => {
        const description =
          computeRanking && !rank
            ? `شما قبلا یکبار این ازمون را شرکت کرده اید. برای هر ازمون تنها یکبار رتبه صادر میگردد`
            : !computeRanking
            ? 'حداقل زمان قابل قبول برای ازمون 5 دقیقه است. لطفا برای محاسبه رتبه با دقت بیشتری ازمون را بررسی کنید'
            : null
        this.setState({
          hasTestResult: true,
          testInfo: {
            rank,
            percentage,
            description,
          },
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
        <AppBar
          leftText={
            hasTestResult && (
              <Fab
                variant="extended"
                size="small"
                color="primary"
                style={{
                  background: 'linear-gradient(to right, #5c89eacc, #fb00ffcc)',
                  width: 140,
                  borderRadius: 15,
                }}
                aria-label="Add"
              >
                <InsertChart style={{ marginRight: 15 }} />
                نتایج ازمون
              </Fab>
            )
          }
          rightText={
            hasTestResult &&
            fileName && (
              <Fab
                variant="extended"
                size="small"
                style={{
                  background: 'linear-gradient(to left, #5c89eacc, #fb00ffcc)',
                  color: 'white',
                  width: 140,
                  borderRadius: 15,
                }}
                aria-label="Add"
              >
                <Download style={{ marginRight: 8 }} />
                پاسخ تشریحی
              </Fab>
            )
          }
          onLeftClick={() => this.handleDialog('OPEN')}
          onRightClick={() =>
            downloadPdf(fileName).then(blob => saveBlobToDisk(blob, fileName))
          }
        />
        <SimpleBar
          style={{
            height: '70%',
            width: '70%',
            minWidth: 350,
            maxHeight: 630,
            marginTop: 70,
          }}
        >
          <Form
            disableUpload
            formName={formName}
            questions={questions}
            openSnackBar={isSnackBarOpen}
            sendForm={this.send}
            snackBarHandler={this.snackBarHandler}
            changeAnswer={this.changeAnswer}
          />
        </SimpleBar>
        {hasTestResult && formName && (
          <Dialog
            open={isDialogOpen}
            handleClose={() => this.handleDialog('CLOSE')}
            formName={formName}
            testInfo={testInfo || undefined}
          />
        )}
      </div>
    )
  }
}

StudentForm.propTypes = {
  formId: PropTypes.string,
  disableSound: PropTypes.bool,
}

StudentForm.defaultProps = {
  disableSound: false,
  formId: '',
}

export default StudentForm
