import React, { Component } from 'react'
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
class FormInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formName: '',
      questionCount: 0,
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(key, value) {
    this.setState({ [key]: value })
  }

  render() {
    const { questionCount, formName } = this.state
    const { classes } = this.props
    return (
      <Paper className={classes.root}>
        <Input
          placeholder="Form Name"
          value={formName}
          onChange={event => this.onChange('formName', event.target.value)}
        />
        <Count
          value={questionCount}
          onChange={event => this.onChange('questionCount', event.target.value)}
        />
        <Button text="Create Form" onClick={console.log} />
      </Paper>
    )
  }
}

FormInfo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default withStyles(styles)(FormInfo)
