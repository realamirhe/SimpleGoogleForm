import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Face from '@material-ui/icons/Face'
import Email from '@material-ui/icons/Email'

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
})

class SignUp extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    showPassword: false,
  }

  handleChange = prop => ({ target: { value } }) => {
    this.setState({ [prop]: value })
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }))
  }

  render() {
    const { classes } = this.props
    const { username, email, password, showPassword } = this.state
    return (
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          CREATE NEW ACCOUNT
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
                onClick={this.handleClickShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="outlined-email-input"
          label="Email"
          className={classNames(classes.margin, classes.textField)}
          type="email"
          variant={email}
          name="email"
          onChange={this.handleChange('email')}
          autoComplete="email"
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
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
        >
          Sign Up
        </Fab>
      </div>
    )
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignUp)
