import React, { Component } from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
// assets
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

// style
const styles = theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
  rootDialogContent: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
})

const TestResultDialog = ({
  classes,
  open,
  handleClose,
  formName,
  testInfo,
}) => (
  <Dialog onClose={handleClose} open={open}>
    <DialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{formName}</Typography>
      {handleClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>

    <DialogContent className={{ root: classes.rootDialogContent }}>
      <Typography variant="h6" gutterBottom>
        percentage {testInfo.percentage.toFixed(2)}%
      </Typography>
      <Typography variant="h6" gutterBottom>
        {testInfo.rank
          ? `ranking is ${testInfo.rank} person`
          : 'you have alredy participated'}
      </Typography>
    </DialogContent>
  </Dialog>
)

TestResultDialog.propTypes = {
  open: PropTypes.bool,
}
TestResultDialog.defaultProps = {
  open: false,
}

export default withStyles(styles)(TestResultDialog)
