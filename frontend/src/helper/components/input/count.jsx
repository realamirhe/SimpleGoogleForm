import React from 'react'
import PropTypes from 'prop-types'
// third-party-package
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
// import TextField from '@material-ui/core/TextField'
import InputBase from '@material-ui/core/InputBase'

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
    width: 80,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
})

/* Form Count */
const Count = ({ classes, value, onChange }) => (
  <Paper className={classes.root} elevation={1}>
    <InputBase
      label="Number"
      fullWidth
      onChange={onChange}
      type="number"
      placeholder="0"
      className={classes.textField}
      margin="dense"
      value={value}
    />
  </Paper>
)

Count.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
}

export default withStyles(styles)(Count)
