import React from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import Button from '@material-ui/core/Button'
// style
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
})

function UploadButton({ onChange, classes }) {
  return (
    <div>
      <input
        accept="application/pdf"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={onChange}
      />
      <label htmlFor="contained-button-file">
        <Button
          color="secondary"
          variant="contained"
          component="span"
          className={classes.button}
        >
          بارگذاری پاسخ تشریحی
        </Button>
      </label>
    </div>
  )
}

UploadButton.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(UploadButton)
