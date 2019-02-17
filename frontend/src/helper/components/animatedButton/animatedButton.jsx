import React from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import { AwesomeButtonProgress } from 'react-awesome-button'
// style
import 'react-awesome-button/dist/styles.css'

/* Animated Button */
const AnimatedButton = ({ size, loadingLabel, resultLabel, text, onclick }) => (
  <AwesomeButtonProgress
    type="primary"
    size={size}
    loadingLabel={loadingLabel}
    resultLabel={resultLabel}
    onPress={onclick}
    action={(element, next) => {}}
  >
    {text}
  </AwesomeButtonProgress>
)

AnimatedButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
  loadingLabel: PropTypes.string,
  resultLabel: PropTypes.string,
  text: PropTypes.string,
  onclick: PropTypes.func,
}
AnimatedButton.defaultProps = {
  size: 'medium',
  loadingLabel: 'waiting ...',
  resultLabel: 'Success',
  text: '',
  onclick: Function.prototype,
}
export default AnimatedButton
