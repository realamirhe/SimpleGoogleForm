import React from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import classNames from 'classnames'
// style
import './style.scss'

// CONST
const FILL = 'FILL'
const REMOVE = 'REMOVE'

/* Checkbox */
const Checkbox = ({ isChecked, innerText, onClick }) => {
  const className = classNames('c--checkbox', { is_checked: isChecked })
  return (
    <div
      onClick={isChecked ? onClick(REMOVE) : onClick(FILL)}
      className={className}
    >
      {isChecked ? '✓' : innerText}
    </div>
  )
}

Checkbox.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Checkbox
