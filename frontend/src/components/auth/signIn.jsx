// moduls
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// components
import { withStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Face from '@material-ui/icons/Face'
import { navigate } from '@reach/router'
// helper
import { signIn } from '../../helper/functions/requestHandler'
import { save } from '../../helper/functions/localStorage'

const styles = theme => ({
  root: {
    width: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  icon: {
    cursor: 'pointer',
  },
})

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
  }

  handleChange = prop => ({ target: { value } }) => {
    this.setState({ [prop]: value })
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }))
  }

  render() {
    const { classes, setIsAdminLoggedIn } = this.props
    const { username, password, showPassword } = this.state

    return (
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          Let's Get Started!
        </Typography>
        <TextField
          id="outlined-adornment-username"
          className={classNames(classes.margin, classes.textField)}
          onChange={this.handleChange('username')}
          value={username}
          variant="outlined"
          label="Username"
          name="username"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Face />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="outlined-adornment-password"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          value={password}
          fullWidth
          onChange={this.handleChange('password')}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className={classes.icon}
                onClick={this.handleClickShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </InputAdornment>
            ),
          }}
        />
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="Add"
          className={classes.margin}
          onClick={() =>
            signIn(username, password).then(isAdminLoggedIn => {
              save('state', { isAdminLoggedIn })
              setIsAdminLoggedIn(isAdminLoggedIn)
              if (isAdminLoggedIn) navigate('/adminPage')
              // else snakbar
            })
          }
        >
          Sign In
        </Fab>
      </div>
    )
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignIn)
