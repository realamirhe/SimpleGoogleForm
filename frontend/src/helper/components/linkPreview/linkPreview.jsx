import React, { Component } from 'react'
import PropTypes from 'prop-types'
// component
import Snackbar from '../snackBar'
// third-party-packages
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
// assets
import FileCopy from '@material-ui/icons/FileCopy'

const styles = theme => ({
  card: {
    // display: 'flex',
  },
  content: {
    flex: '1 0 auto',
  },
  link: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
})

class LinkPreview extends Component {
  constructor(props) {
    super(props)
    this.state = { copy: false }
    this.copy = this.copy.bind(this)
    this.close = this.close.bind(this)
  }

  copy() {
    const { link } = this.props
    navigator.clipboard.writeText(link).then(
      () => {
        this.setState({ copy: true, type: 'success' })
      },
      () => {
        this.setState({ copy: true, type: 'error' })
      },
    )
  }

  close() {
    this.setState({ copy: false })
  }

  render() {
    const { copy, type } = this.state
    const { classes, link } = this.props
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography component="h5" variant="h5">
            Form Link
          </Typography>
          <Typography color="inherit" className={classes.link}>
            <Link href={link} className={classes.link}>
              {link}
            </Link>
          </Typography>
          <Button
            variant="contained"
            size="small"
            color="primary"
            className={classes.button}
            onClick={this.copy}
          >
            <FileCopy
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            Copy
          </Button>
        </CardContent>

        <Snackbar
          message={`${
            type === 'success' ? 'copied Successfully' : 'copy failed'
          }`}
          onClose={this.close}
          variant={type}
          autoHideDuration={1000}
          open={copy}
        />
      </Card>
    )
  }
}

export default withStyles(styles)(LinkPreview)
