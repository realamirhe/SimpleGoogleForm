import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
// third-party-packages
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Link from '@material-ui/core/Link'
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
  link: {
    margin: theme.spacing.unit,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
})

// TODO: onClick={/* request to form id*/}
/* Mini Form Item */
const MiniFormItem = ({ classes, formName, formId }) => {
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography variant="subtitle1">{formName}</Typography>
      </CardContent>
      <Icon
        color="secondary"
        icon={<Edit />}
        ariaLabel="Edit"
        onClick={() => navigate(`/adminPage/${formId}`)}
      />
      <Typography color="inherit" className={classes.link}>
        <Link href={formId} className={classes.link}>
          {formId}
        </Link>
      </Typography>
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
