import React from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import classNames from 'classnames'
// style
import './style.scss'
// CONST
import { REMOVE, FILL } from '../../../functions/constants'

/* Checkbox */
const Checkbox = ({ isChecked, innerText, onClick }) => (
  <div
    onClick={isChecked ? onClick(REMOVE) : onClick(FILL)}
    className={classNames('c--checkbox', { is_checked: isChecked })}
  >
    {isChecked ? '✓' : innerText}
  </div>
)

Checkbox.propTypes = {
  onClick: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,

  innerText: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
}

export default Checkbox
