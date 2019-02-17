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
const FormMaker = ({ classes }) => (
  <Paper className={classes.root}>
    <Input placeholder="Form Name" onChange={Function.prototype} />
    <Count value={0} onChange={Function.prototype} />
    <Button text="Create Form" />
  </Paper>
)

FormMaker.propTypes = {}

export default withStyles(styles)(FormMaker)
