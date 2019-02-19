import React from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
// components
import { Input, Count } from '../../../helper/components/input'
import { Button } from '../../../helper/components/buttons'
// style
const styles = {
  root: {
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'hotpink',
    width: 400,
  },
}
/* Admin Form */
const FormInfo = ({ classes, onChangeInput, onChangeCount, onSubmit }) => (
  <Paper className={classes.root}>
    <Input placeholder="Form Name" onChange={onChangeInput} />
    <Count value={0} onChange={onChangeCount} />
    <Button text="Create Form" onClick={onSubmit} />
  </Paper>
)

FormInfo.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  onChangeCount: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default withStyles(styles)(FormInfo)
