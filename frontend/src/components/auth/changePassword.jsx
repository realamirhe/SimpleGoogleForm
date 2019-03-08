// moduls
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// components
import { withStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Visibility from '@material-ui/icons/Lock'
import VisibilityOff from '@material-ui/icons/LockOpen'
// import { navigate } from '@reach/router'
import { AnimatedButton } from '../../helper/components/buttons'
import SnackBar from '../../helper/components/snackBar'
// helper
// import { signIn } from '../../helper/functions/requestHandler'
// import { save } from '../../helper/functions/localStorage'

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
    password0: '',
    password1: '',
    password2: '',
    showPassword0: false,
    showPassword1: false,
    showPassword2: false,
    errorMessage: false,
  }

  componentDidMount() {
    document.title = 'تغیر رمز عبور'
  }

  handleChange = prop => ({ target: { value } }) => {
    this.setState({ [prop]: value })
  }

  handleClickShowPassword = i => () => {
    this.setState(state => ({
      [`showPassword${i}`]: !state[`showPassword${i}`],
    }))
  }

  render() {
    const { classes, setIsAdminLoggedIn } = this.props
    const {
      password0,
      password1,
      password2,
      showPassword0,
      showPassword1,
      showPassword2,
      errorMessage,
    } = this.state

    return (
      <Fragment>
        <Paper className={classes.root}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ color: '#333333', fontSize: '2.5rem' }}
          >
            تغییر رمز عبور
          </Typography>
          <TextField
            id="outlined-adornment-username"
            className={classNames(classes.margin, classes.textField)}
            onChange={this.handleChange('password0')}
            type={showPassword0 ? 'text' : 'password'}
            value={password0}
            variant="outlined"
            label="رمز قبلی"
            name="username"
            margin="dense"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classNames(classes.icon)}
                  onClick={this.handleClickShowPassword(0)}
                >
                  {showPassword0 ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="outlined-adornment-new-password-1"
            className={classNames(classes.margin, classes.textField)}
            variant="outlined"
            type={showPassword1 ? 'text' : 'password'}
            label="رمز جدید"
            value={password1}
            margin="dense"
            onChange={this.handleChange('password1')}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classNames(classes.icon)}
                  onClick={this.handleClickShowPassword(1)}
                >
                  {showPassword1 ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),
            }}
          />

          <TextField
            id="outlined-adornment-new-password-2"
            className={classNames(classes.margin, classes.textField)}
            variant="outlined"
            type={showPassword2 ? 'text' : 'password'}
            label="تکرار رمز جدید"
            value={password2}
            margin="dense"
            onChange={this.handleChange('password2')}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classNames(classes.icon)}
                  onClick={this.handleClickShowPassword(2)}
                >
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),
            }}
          />
          <AnimatedButton
            onClick={() => {
              // TODO: validate password errors are handled by snackbar. and change password in db and localstorage
              if (password1 !== password2)
                this.setState({
                  errorMessage: 'رمز عبور های جدید با هم متفاوت اند',
                })
              // if (password0 was incorect)
              // this.setState({
              //   errorMessage: 'رمز عبور قدیمی یافت نشد لطفا دوباره سعی کنید',
              // })
              console.log('shout change a password')
            }}
            text="ورود"
          />
        </Paper>
        <SnackBar
          open={!!errorMessage}
          variant="error"
          message={errorMessage}
          onClose={() => this.setState({ errorMessage: '' })}
        />
      </Fragment>
    )
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignIn)
