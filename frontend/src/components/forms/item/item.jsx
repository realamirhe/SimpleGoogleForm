import React from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
// component
import Icon from '../../../helper/components/Icon'
// style
import { withStyles } from '@material-ui/core/styles'
// assets
import Edit from '@material-ui/icons/Edit'

const styles = theme => ({
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  content: {
    flex: '1 0 auto',
  },
})

// TODO: onClick={/* request to form id*/}
/* Mini Form Item */
const MiniFormItem = ({ classes, formName, fromId }) => {
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography variant="subtitle1">{formName}</Typography>
      </CardContent>
      <Icon color="secondary" icon={<Edit />} ariaLabel="Edit" />
    </Card>
  )
}

MiniFormItem.propTypes = {
  formName: PropTypes.string,
  formId: PropTypes.string.isRequired,
}
MiniFormItem.defaultProps = {
  formName: 'Unknown Form',
}

export default withStyles(styles)(MiniFormItem)
