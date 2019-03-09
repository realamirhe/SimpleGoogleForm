import React from 'react'
import PropTypes from 'prop-types'
import SimpleBar from 'simplebar-react'

import AppBar from './appBar'

const WithAppBarr = ({
  onLeftClick,
  onRightClick,
  rightText,
  leftText,
  children,
}) => (
  <div
    style={{
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <AppBar
      leftText={leftText}
      rightText={rightText}
      onLeftClick={onLeftClick}
      onRightClick={onRightClick}
    />
    <SimpleBar
      style={{
        height: '70%',
        width: '70%',
        minWidth: 350,
        maxHeight: 630,
        marginTop: 70,
      }}
    >
      {children}
    </SimpleBar>
  </div>
)

WithAppBarr.propTypes = {
  onLeftClick: PropTypes.func,
  onRightClick: PropTypes.func,
  rightText: PropTypes.node,
  leftText: PropTypes.node,
}

WithAppBarr.defaultProps = {
  onLeftClick: Function.prototype,
  onRightClick: Function.prototype,
  rightText: '',
  leftText: '',
}
export default WithAppBarr
