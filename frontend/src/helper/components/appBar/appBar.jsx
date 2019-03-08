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
  },
  input: {
    display: 'none',
  },
})

/* App bar */
const AppBar = ({ classes }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '100%',
        position: 'fixed',
        display: 'flex',
        top: 0,
        justifyContent: 'space-between',
        height: 55,
        zIndex: 2,
      }}
    >
      <Button disableFocusRipple disableRipple className={classes.button}>
        خروج
      </Button>
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
      <Button disableFocusRipple disableRipple className={classes.button}>
        رمز عبور
      </Button>
    </div>
  )
}

AppBar.propTypes = {}
AppBar.defaultProps = {}

export default withStyles(styles)(AppBar)
