import React, { Component } from 'react'
import PropTypes from 'prop-types'
// Third-party-packages
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { update, map, always, range, any, isNil } from 'ramda'
// component
import Pack from './pack'
import { Button } from './../buttons'
import Snackbar from '../snackBar'
// import { getForm } from '../../helper/functions/requestHandler'
import { Map, Block } from '../../functions/ramdaHelper'
// assets
import Pencil from '../../../assets/sound_fx/pencil.mp3'
import Eraser from '../../../assets/sound_fx/eraser.mp3'
// CONST
import { FILL, REMOVE, ADMIN } from '../../functions/constants'
// instance helpers
const pencilPlayer = new Audio(Pencil)
const eraserPlayer = new Audio(Eraser)
// style
const styles = {
  root: {
    padding: 15,
    background: 'cornflowerblue',
    borderRadius: 20,
  },

  warper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
}

/* Form */
class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionCount: props.initialQuestionCount,
      questions: props.initialQuestions,
      formName: props.initialFormName,

      isSnackBarOpen: false,
    }

    this.changeAnswer = this.changeAnswer.bind(this)
    this.sendForm = this.sendForm.bind(this)

    this.snackBarHandler = this.snackBarHandler.bind(this)
  }

  componentDidMount() {
    // const { admin, fromId } = this.props
    // if (!admin && formId)
    // getForm(formId).then(this.initialization)
  }

  // snackBar
  snackBarHandler(open = false) {
    if (open) this.setState({ isSnackBarOpen: open })
    else this.setState({ isSnackBarOpen: open })
  }
  // Form
  initialization({ questionCount, formName }) {
    const questions = map(always(null), range(0, questionCount))
    this.setState({ questions, questionCount, formName })
  }
  changeAnswer(index) {
    const { disableSound } = this.props
    return newValue => type => () => {
      if (!disableSound && type === FILL) pencilPlayer.play()
      else if (!disableSound && type === REMOVE) eraserPlayer.play()
      const answer = type === REMOVE ? null : newValue
      this.setState(({ questions }) => ({
        questions: update(index, answer, questions),
      }))
    }
  }
  sendForm() {
    const { questions } = this.state
    const { admin } = this.props
    if (admin && any(isNil, questions)) this.snackBarHandler(true)
    else console.log('okay')
    //TODO: send data back to form itself
  }

  render() {
    const { questions, isSnackBarOpen } = this.state
    const { classes } = this.props
    return (
      <Paper className={classes.root} elevation={1}>
        <div className={classes.warper}>
          {Map(
            (blockQuestion, index) => (
              <Pack
                index={10 * index}
                blockQuestion={blockQuestion}
                changeAnswer={this.changeAnswer}
                key={10 * index}
              />
            ),
            Block(10, questions),
          )}
        </div>
        <span
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button type="secondary" text="Send" onClick={this.sendForm} />
          <Button
            type="secondary"
            text="upload"
            onClick={this.uploadAnswerPdf}
          />
        </span>
        <Snackbar
          open={isSnackBarOpen}
          variant="error"
          message="You must answer all question"
          onClose={() => this.snackBarHandler(false)}
        />
      </Paper>
    )
  }
}

Form.propTypes = {
  disableSound: PropTypes.bool,
  admin: PropTypes.bool,

  initialQuestionCount: PropTypes.number,
  initialQuestions: PropTypes.arrayOf(PropTypes.number),
  initialFormName: PropTypes.string,
}

Form.defaultProps = {
  disableSound: false,
  admin: false,

  initialQuestionCount: 0,
  initialQuestions: [],
  initialFormName: '',
}

export default withStyles(styles)(Form)
