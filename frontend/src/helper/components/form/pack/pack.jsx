import React from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
// helper
import { Map } from '../../../functions/ramdaHelper'
// component
import Question from '../question'
// style
import './style.scss'
const styles = theme => ({
  root: {
    padding: '2px 4px 12px',
    display: 'flex',
    alignItems: 'center',
    minWidth: 180,
    flexFlow: 'column',
    borderRadius: 15,
    boxSizing: 'border-box',
    margin: '5px 20px',
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.down('md')]: {
      width: '70%',
    },
    [theme.breakpoints.up('lg')]: {
      width: 'initial',
    },
  },
})

const Pack = ({ classes, blockQuestion, index, changeAnswer }) => (
  // <div className="c--pack">
  <Paper className={classes.root} elevation={1}>
    {Map((value, blockIndex) => {
      const questionIndex = index + blockIndex
      return (
        <Question
          initialValue={value}
          label={questionIndex}
          changeAnswer={changeAnswer(questionIndex)}
          key={questionIndex}
        />
      )
    }, blockQuestion)}
  </Paper>
)

Pack.propTypes = {
  blockQuestion: PropTypes.array,
  index: PropTypes.number,
  changeAnswer: PropTypes.func,
}
Pack.defaultProps = {
  blockQuestion: [],
  index: 0,
  changeAnswer: Function.prototype,
}

export default withStyles(styles)(Pack)
