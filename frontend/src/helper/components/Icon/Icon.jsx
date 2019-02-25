import React from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import Fab from '@material-ui/core/Fab'
// style
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
})

/* Icon */
const Icon = ({
  classes,
  size,
  icon,
  color,
  ariaLabel,
  onClick,
  text,
  style,
}) => {
  return (
    <Fab
      size={size}
      color={color}
      aria-label={ariaLabel}
      disableFocusRipple
      className={classes.fab}
      onClick={onClick}
      style={style}
    >
      {icon}
      {text}
    </Fab>
  )
}

Icon.propTypes = {
  size: PropTypes.string,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string,
  ariaLabel: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
}
Icon.defaultProps = {
  size: 'small',
  color: 'primary',
  ariaLabel: '',
  text: '',
  onClick: Function.prototype,
}

export default withStyles(styles)(Icon)
