import React from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import Fab from '@material-ui/core/Fab'
// style
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  fab: {
    margin: 5,
  },
})

/* Icon */
const Icon = ({ classes, size, icon, color, ariaLabel, onClick }) => {
  return (
    <Fab
      size={size}
      color={color}
      aria-label={ariaLabel}
      disableFocusRipple
      className={classes.fab}
      onClick={onClick}
    >
      {icon}
    </Fab>
  )
}

Icon.propTypes = {
  size: PropTypes.string,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string,
  ariaLabel: PropTypes.string,
  onClick: PropTypes.func,
}
Icon.defaultProps = {
  size: 'small',
  color: 'primary',
  ariaLabel: '',
  onClick: Function.prototype,
}

export default withStyles(styles)(Icon)
