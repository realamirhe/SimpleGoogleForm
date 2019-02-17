import React from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import { AwesomeButton } from 'react-awesome-button'
// style
import 'react-awesome-button/dist/styles.css'

/* Animated Button */
const Button = ({ type, size, text, onClick }) => (
  <AwesomeButton type={type} size={size} action={onClick}>
    {text}
  </AwesomeButton>
)

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium']),
  text: PropTypes.string,
  onClick: PropTypes.func,
}
Button.defaultProps = {
  type: 'primary',
  size: 'medium',
  text: '',
  onClick: Function.prototype,
}
export default Button
