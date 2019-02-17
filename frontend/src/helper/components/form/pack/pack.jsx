import React from 'react'
import PropTypes from 'prop-types'
// helper
import { Map } from '../../../functions/ramdaHelper'
// component
import Question from '../question'
// style
import './style.scss'

const Pack = ({ blockQuestion, index, changeAnswer }) => (
  <div className="c--pack">
    {Map((value, blockIndex) => {
      const questionIndex = index + blockIndex
      return (
        <Question
          initialValue={value}
          label={questionIndex}
          changeAnswer={changeAnswer(questionIndex)}
          key={questionIndex}
        />
      )
    }, blockQuestion)}
  </div>
)

Pack.propTypes = {
  blockQuestion: PropTypes.array,
  index: PropTypes.number,
  changeAnswer: PropTypes.func,
}
Pack.defaultProps = {
  blockQuestion: [],
  index: 0,
  changeAnswer: Function.prototype,
}

export default Pack
