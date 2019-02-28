// moduls
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// components
import { withStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Face from '@material-ui/icons/Face'
import { navigate } from '@reach/router'
import { AnimatedButton } from '../../helper/components/buttons'
// helper
import { signIn } from '../../helper/functions/requestHandler'
import { save } from '../../helper/functions/localStorage'

const styles = theme => ({
  root: {
    maxWidth: 500,
    width: 500,
    height: 400,
    maxHeight: 400,
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    width: '80%',
    minHeight: 50,
    height: 50,

  },
  icon: {
    cursor: 'pointer',
    maxHeight: 24,
    height: 24,
    minHeight: 24,
  },
})

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
  }

  componentDidMount() {
    document.title = 'صفحه ورود'
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
      <Paper className={classes.root}>
        <Typography variant="h5" gutterBottom style={{color:'#333333', fontSize: '2.5rem'}}>
          ورود
        </Typography>
        <TextField
          id="outlined-adornment-username"
          className={classNames(classes.margin, classes.textField)}
          onChange={this.handleChange('username')}
          value={username}
          variant="outlined"
          label="نام کاربری"
          name="username"
          margin="dense"
          InputProps={{
            startAdornment: (
              <InputAdornment className={classes.icon} position="start">
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
          label="رمز عبور"
          value={password}
          margin="dense"
          onChange={this.handleChange('password')}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className={classNames(classes.icon)}
                onClick={this.handleClickShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </InputAdornment>
            ),
          }}
        />

        <AnimatedButton
          onClick={() =>
            signIn(username, password).then(isAdminLoggedIn => {
              save('state', { isAdminLoggedIn })
              setIsAdminLoggedIn(isAdminLoggedIn)
              if (isAdminLoggedIn) navigate('/adminPage/forms')
              // else snakbar
            })
          }
          text="ورود"
        />
      </Paper>
    )
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignIn)
