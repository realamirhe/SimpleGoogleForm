import React from 'react'
import PropTypes from 'prop-types'
// component
import Question from '../question'
// style
import './style.scss'

const pack = ({ from }) => (
  <div className="c--pack">
    <Question number={from + 0} />
    <Question number={from + 1} />
    <Question number={from + 2} />
    <Question number={from + 3} />
    <Question number={from + 4} />
    <Question number={from + 5} />
    <Question number={from + 6} />
    <Question number={from + 7} />
    <Question number={from + 8} />
    <Question number={from + 9} />
  </div>
)

pack.propTypes = {
  from: PropTypes.number.isRequired,
}

export default pack
