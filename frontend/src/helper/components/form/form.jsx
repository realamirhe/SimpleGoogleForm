import React, { Component } from 'react'
import PropTypes from 'prop-types'
// Third-party-packages
import { update, map, always, range, any, isNil } from 'ramda'
// component
import Pack from './pack'
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

/* Form */
class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionCount: 0,
      questions: [],
      formName: '',
    }

    this.changeAnswer = this.changeAnswer.bind(this)
  }

  componentDidMount() {
    // const { formId } = this.props
    // if (formId)
    // getForm(formId).then(this.initialization)
  }

  sendForm(user) {
    const { questions } = this.state
    if (user === ADMIN) {
      if (any(isNil, questions)) //TODO: show snackbar error componet
      else //TODO: send data back to form itself
    }
  }

  changeAnswer(index) {
    const { disableSound } = this.props
    return newValue => type => {
      if (!disableSound && type === FILL) pencilPlayer.play()
      else if (!disableSound && type === REMOVE) eraserPlayer.play()
      this.setState(({ questions }) => ({
        questions: update(index, newValue, questions),
      }))
    }
  }

  initialization({ questionCount, formName }) {
    const questions = map(always(null), range(0, questionCount))
    this.setState({ questions, questionCount, formName })
  }

  render() {
    const { questions } = this.state
    return (
      <div>
        {Map(
          (blockQuestion, index) => (
            <Pack
              index={10 * index}
              blockQuestion={blockQuestion}
              changeAnswer={this.changeAnswer}
            />
          ),
          Block(10, questions),
        )}
      </div>
    )
  }
}

Form.propTypes = {
  disableSound: PropTypes.bool,
}

Form.defaultProps = {
  disableSound: false,
}

export default Form
