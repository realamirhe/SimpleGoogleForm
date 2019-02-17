import React from 'react'
import PropTypes from 'prop-types'
// third-party-package
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
}

/* Form Input */
const Input = ({ classes, placeholder, onChange }) => (
  <Paper className={classes.root} elevation={1}>
    <InputBase
      className={classes.input}
      placeholder={placeholder}
      onChange={onChange}
    />
  </Paper>
)

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default withStyles(styles)(Input)
