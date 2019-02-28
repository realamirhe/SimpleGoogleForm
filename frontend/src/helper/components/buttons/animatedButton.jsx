import React from 'react'
import PropTypes from 'prop-types'
// style
import './animatedButton.scss'

const AnimatedButton = ({ onClick, text }) => {
  return (
    <div className="container-login100-form-btn">
      <div className="wrap-login100-form-btn">
        <div className="login100-form-bgbtn" />
        <button className="login100-form-btn" onClick={onClick}>
          {text}
        </button>
      </div>
    </div>
  )
}

AnimatedButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
}
AnimatedButton.defaultProps = {
  onClick: Function.prototype,
  text: '',
}

export default AnimatedButton
