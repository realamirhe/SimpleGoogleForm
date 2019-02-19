import React from 'react'
import PropTypes from 'prop-types'
// third-party-package
import classNames from 'classnames'
import green from '@material-ui/core/colors/green'
import IconButton from '@material-ui/core/IconButton'
import MuiSnackBar from '@material-ui/core/Snackbar'
import SnackContent from '@material-ui/core/SnackbarContent'
// style
import { withStyles } from '@material-ui/core/styles'
// assets
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import CloseIcon from '@material-ui/icons/Close'

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
}

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
})

const SnackBar = props => {
  const {
    classes,
    open,
    variant,
    className,
    onClose,
    message,
    autoHideDuration,
  } = props
  const Icon = variantIcon[variant]
  return (
    <MuiSnackBar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <SnackContent
        className={classNames(classes[variant], className)}
        message={
          <span className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </MuiSnackBar>
  )
}

SnackBar.propTypes = {
  autoHideDuration: PropTypes.number,
  variant: PropTypes.string,
}
SnackBar.defaultProps = {
  autoHideDuration: 2000,
  variant: 'error',
}
export default withStyles(styles)(SnackBar)
