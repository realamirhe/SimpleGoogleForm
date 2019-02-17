import React from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import { AwesomeButton } from 'react-awesome-button'
// style
import 'react-awesome-button/dist/styles.css'

/* Animated Button */
const Button = ({ size, text, onclick }) => (
  <AwesomeButton
    type="primary"
    size={size}
    onPress={onclick}
    action={(element, next) => {}}
  >
    {text}
  </AwesomeButton>
)

Button.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
  text: PropTypes.string,
  onclick: PropTypes.func,
}
Button.defaultProps = {
  size: 'medium',
  text: '',
  onclick: Function.prototype,
}
export default Button
