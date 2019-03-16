import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
// components
import { Input, Count } from '../../../helper/components/input'
import { Button } from '../../../helper/components/buttons'
import { navigate } from '@reach/router'
import SnackBar from '../../../helper/components/snackBar'
import WithAppBar from '../../../helper/components/appBar/withAppBar.jsx'

// style
const styles = {
  root: {
    maxWidth: 500,
    width: 500,
    height: 200,
    maxHeight: 400,
    borderRadius: 30,
    backgroundColor: '#707aed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
}
/* Admin Form */
class FormInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formName: '',
      initialQuestionCount: 0,
      errorMessage: '',
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(key, value) {
    this.setState({ [key]: value })
  }

  render() {
    const { initialQuestionCount, formName, errorMessage } = this.state
    const { classes, setNewFormInfo } = this.props
    return (
      <WithAppBar
        leftText="بازگشت"
        onLeftClick={() => navigate('/adminPage/forms')}
        disableBar
      >
        <Fragment>
          <Paper dir="rtl" className={classes.root}>
            <Input
              placeholder="نام ازمون"
              value={formName}
              onChange={event => this.onChange('formName', event.target.value)}
            />
            <Count
              value={initialQuestionCount}
              onChange={event =>
                this.onChange(
                  'initialQuestionCount',
                  Number(event.target.value),
                )
              }
            />
            <Button
              text="ساخت ازمون"
              onClick={() => {
                if (initialQuestionCount > 0 && formName) {
                  setNewFormInfo({
                    formName,
                    initialQuestionCount,
                  })
                  navigate('/adminPage/createNewForm')
                } else if (initialQuestionCount <= 0)
                  this.setState({
                    errorMessage: 'تعداد سوالات حتما باید عددی مثبت باشد',
                  })
                else
                  this.setState({
                    errorMessage: 'برای فرم نامی انتخاب نشده',
                  })
              }}
            />
          </Paper>
          <SnackBar
            open={!!errorMessage}
            variant="error"
            message={errorMessage}
            onClose={() => this.setState({ errorMessage: '' })}
          />
        </Fragment>
      </WithAppBar>
    )
  }
}

FormInfo.propTypes = {
  onSubmit: PropTypes.func,
}

FormInfo.propTypes = {
  onSubmit: Function.prototype,
}
export default withStyles(styles)(FormInfo)
