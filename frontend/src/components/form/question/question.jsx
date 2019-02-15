import React, { Component } from 'react'
import PropTypes from 'prop-types'
// component
import Checkbox from './checkbox'
// assets
import Pencil from '../../../assets/sound_fx/pencil.mp3'
import Eraser from '../../../assets/sound_fx/eraser.mp3'
// CONST
const FILL = 'FILL'
const pencilPlayer = new Audio(Pencil)
const eraserPlayer = new Audio(Eraser)

/* Question */
class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(value) {
    return type => () => {
      if (type === FILL) {
        this.setState({ selected: value })
        pencilPlayer.play()
      } else {
        this.setState({ selected: null })
        eraserPlayer.play()
      }
    }
  }

  render() {
    const { selected } = this.state
    const { number } = this.props
    return (
      <div className="c--question">
        <span className="question_label">{number}</span>
        <div style={{ display: 'flex' }}>
          {['1', '2', '3', '4'].map(value => (
            <Checkbox
              key={value}
              innerText={value}
              onClick={this.handleSelect(value)}
              isChecked={value === selected}
            />
          ))}
        </div>
      </div>
    )
  }
}

Question.propTypes = {
  number: PropTypes.number.isRequired,
}

export default Question
