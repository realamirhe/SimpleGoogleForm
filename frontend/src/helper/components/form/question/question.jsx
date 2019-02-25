import React from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import { map } from 'ramda'
// component
import Checkbox from './checkbox'
// helper
import { toPersianNumber } from '../../../functions/utils'

/* Question */
const Question = ({ initialValue, label, changeAnswer }) => (
  <div className="c--question">
    <span className="question_label">{toPersianNumber(label + 1)}</span>
    <div style={{ display: 'flex' }}>
      {map(
        value => (
          <Checkbox
            key={value}
            innerText={toPersianNumber(value)}
            onClick={changeAnswer(value)}
            isChecked={value === initialValue}
          />
        ),
        [1, 2, 3, 4],
      )}
    </div>
  </div>
)

Question.propTypes = {
  label: PropTypes.number.isRequired,
  initialValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Question
