import React from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
// assets
import image from '../../../assets/images/brand.png'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    cursor: 'pointer',
  },
  input: {
    display: 'none',
  },
})

/* App bar */
const AppBar = ({
  classes,
  onLeftClick,
  onRightClick,
  rightText,
  leftText,
}) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '100%',
        position: 'fixed',
        display: 'flex',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'space-between',
        height: 55,
        zIndex: 2,
      }}
    >
      <span className={classes.button} onClick={onLeftClick}>
        {leftText}
      </span>
      <img
        src={image}
        alt="brand"
        style={{
          width: 150,
          height: 50,
          borderRadius: 37,
          background: 'white',
          padding: 15,
        }}
      />
      <span className={classes.button} onClick={onRightClick}>
        {rightText}
      </span>
    </div>
  )
}

AppBar.propTypes = {
  onLeftClick: PropTypes.func,
  onRightClick: PropTypes.func,
  rightText: PropTypes.node,
  leftText: PropTypes.node,
}
AppBar.defaultProps = {
  onLeftClick: Function.prototype,
  onRightClick: Function.prototype,
  rightText: '',
  leftText: '',
}

export default withStyles(styles)(AppBar)
