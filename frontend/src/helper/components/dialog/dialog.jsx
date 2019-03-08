import React from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
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
    left: theme.spacing.unit,
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
      {handleClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      <Typography variant="h6" dir="rtl">
        ازمون: {formName}
      </Typography>
    </DialogTitle>

    <DialogContent className={classes.rootDialogContent}>
      <Typography variant="h6" gutterBottom dir="rtl">
        درصد: {testInfo.percentage.toFixed(2)}%
      </Typography>
      {testInfo.rank && (
        <Typography variant="h6" gutterBottom dir="rtl">
          رتبه: {testInfo.rank}
        </Typography>
      )}
      {testInfo.description && (
        <Typography variant="h6" gutterBottom dir="rtl">
          {testInfo.description}
        </Typography>
      )}
    </DialogContent>
  </Dialog>
)

TestResultDialog.propTypes = {
  open: PropTypes.bool,
  testInfo: PropTypes.shape({}),
}
TestResultDialog.defaultProps = {
  open: false,
  testInfo: {
    percentage: 0,
    rank: 0,
    description: 'loading...',
  },
}

export default withStyles(styles)(TestResultDialog)
