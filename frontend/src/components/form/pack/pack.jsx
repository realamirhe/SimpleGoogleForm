import React from 'react'
import PropTypes from 'prop-types'
// component
import Question from '../question'
// style
import './style.scss'

const Pack = ({ from, count }) => {
  const numbers = []
  for (let number = from; number < from + count; number++) {
    numbers.push(number)
  }
  return (
    <div className="c--pack">
      {numbers.map(number => (
        <Question number={number} key={number} />
      ))}
    </div>
  )
}
Pack.propTypes = {
  from: PropTypes.number.isRequired,
  count: PropTypes.number,
}
Pack.defaultProps = {
  count: 10,
}

export default Pack
