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
  disableBar,
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
    {!disableBar ? (
      <SimpleBar
        style={{
          height: '70%',
          width: '80%',
          minWidth: 350,
          maxHeight: 630,
          marginTop: 70,
        }}
      >
        {children}
      </SimpleBar>
    ) : (
      children
    )}
  </div>
)

WithAppBarr.propTypes = {
  onLeftClick: PropTypes.func,
  onRightClick: PropTypes.func,
  rightText: PropTypes.node,
  leftText: PropTypes.node,
  disableBar: PropTypes.bool,
}

WithAppBarr.defaultProps = {
  onLeftClick: Function.prototype,
  onRightClick: Function.prototype,
  rightText: '',
  leftText: '',
  disableBar: false,
}
export default WithAppBarr
