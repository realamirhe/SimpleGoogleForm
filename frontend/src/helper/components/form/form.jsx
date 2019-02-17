import React, { Component } from 'react'
// Third-party-packages
import { update } from 'ramda'
// component
import Pack from './pack'
// import { getForm } from '../../helper/functions/requestHandler'
import { Map, Block } from '../../functions/ramdaHelper'
// assets
import Pencil from '../../../assets/sound_fx/pencil.mp3'
import Eraser from '../../../assets/sound_fx/eraser.mp3'
// CONST
import { FILL, REMOVE } from '../../functions/constants'
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
    // getForm(formId).then(this.initialization)
  }

  changeAnswer(index) {
    return newValue => type => {
      if (type === FILL) pencilPlayer.play()
      else if (type === REMOVE) eraserPlayer.play()
      this.setState(({ questions }) => ({
        questions: update(index, newValue, questions),
      }))
    }
  }

  initialization({ questionCount, formName }) {
    const questions = []
    for (let number = 0; number < questionCount; number++) {
      questions.push(null)
    }
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

// Form.propTypes = {}

// Form.defaultProps = {}

export default Form
