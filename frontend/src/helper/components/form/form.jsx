import React from 'react'
import PropTypes from 'prop-types'
// Third-party-packages
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
// component
import Pack from './pack'
import { Button, UploadButton } from './../buttons'
import SnackBar from '../snackBar'

import { Map, Block } from '../../functions/ramdaHelper'

// style
const styles = {
  root: {
    padding: 15,
    background: 'cornflowerblue',
    borderRadius: 20,
  },

  warper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },

  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

/* Form */
const Form = ({
  onFileUpload,
  disableUpload, // true only in normal user
  formName,
  questions,
  openSnackBar,
  classes,
  sendForm,
  changeAnswer,
  snackBarHandler,
}) => {
  return (
    <Paper className={classes.root} elevation={1}>
      <Typography color="textPrimary">{formName}</Typography>

      <div className={classes.warper}>
        {Map(
          (blockQuestion, index) => (
            <Pack
              index={10 * index}
              blockQuestion={blockQuestion}
              changeAnswer={changeAnswer}
              key={10 * index}
            />
          ),
          Block(10, questions),
        )}
      </div>

      <span className={classes.buttons}>
        {!disableUpload && <UploadButton onChange={onFileUpload} />}
        <Button type="secondary" text="Send" onClick={sendForm} />
      </span>

      <SnackBar
        open={openSnackBar}
        variant="error"
        message="You must answer all question"
        onClose={() => snackBarHandler(false)}
      />
    </Paper>
  )
}

Form.propTypes = {
  onFileUpload: PropTypes.func,
  disableUpload: PropTypes.bool,
  sendForm: PropTypes.func.isRequired,
  changeAnswer: PropTypes.func.isRequired,
  snackBarHandler: PropTypes.func.isRequired,

  openSnackBar: PropTypes.bool,

  questions: PropTypes.arrayOf(PropTypes.number),
  formName: PropTypes.string,
}

Form.defaultProps = {
  onFileUpload: Function.prototype,
  disableUpload: false,

  openSnackBar: false,

  questions: [],
  formName: 'LOADING ...',
}

export default withStyles(styles)(Form)
