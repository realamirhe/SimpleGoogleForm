import React, { Component } from 'react'
// third-party-packages
import classNames from 'classnames'
// style
import './style.scss'
// asset
import Tick from '../../../assets/svgs/tick.svg'

class Submit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
      mode: 'normal',
    }
    this.timer = null
    this.buttonRef = this.setRef.bind(this, 'button')
    this.handleClick = this.handleClick.bind(this)
  }

  setRef(type, ref) {
    this[type] = ref
  }

  handleClick() {
    const { clicked } = this.state
    if (!clicked) this.setState({ clicked: true })

    setTimeout(() => {
      this.setState({ mode: 'tick' })
    }, 2500)
  }

  render() {
    const { clicked, mode } = this.state
    const buttonClassName = classNames({
      filled: !clicked || mode === 'tick',
      circle: clicked && mode === 'normal',
    })
    const circleClassName = classNames('circle_2', { fill_circle: clicked })
    return (
      <div className="wrap">
        {mode === 'tick' && <img src={Tick} alt="" />}
        <button
          ref={this.buttonRef}
          onClick={this.handleClick}
          className={buttonClassName}
          //   type="submit"
        >
          {clicked ? '' : 'Submit'}
        </button>
        {clicked && (
          <svg
            width="66px"
            height="66px"
            style={{
              cursor: 'pointer',
              display: !clicked
                ? 'block'
                : mode === 'tick'
                ? 'none'
                : 'inherit',
            }}
          >
            <circle
              className={circleClassName}
              stroke-position="outside"
              strokeWidth="3"
              fill="none"
              cx="34"
              cy="33"
              r="29"
              stroke="#1ECD97"
            />
          </svg>
        )}
      </div>
    )
  }
}

export default Submit
