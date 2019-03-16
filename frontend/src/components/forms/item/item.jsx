import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
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
import FileCopy from '@material-ui/icons/FileCopy'
import Delete from '@material-ui/icons/Delete'

import { deleteForm } from '../../../helper/functions/requestHandler'

const styles = theme => ({
  card: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    margin: 10,
    scrollSnapAlign: 'start',
  },
  content: {
    width: 230,
    textOverflow: 'ellipsis',

    /* Needed to make it work */
    overflow: 'hidden',
    whiteSpace: 'nowrap',
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
const MiniFormItem = ({
  classes,
  formName,
  formId,
  url,
  removeForm,
  onCopy,
}) => {
  return (
    <Card className={classes.card}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Icon
            color="primary"
            icon={<Delete />}
            style={{
              paddingRight: 0,
              marginRight: 5,
            }}
            ariaLabel="Delete"
            onClick={event => {
              event.stopPropagation()
              deleteForm(formId)
                .then(R.when(R.equals('seccessful'), () => removeForm(formId)))
                .catch(() => navigate('/'))
            }}
          />
          <Icon
            color="primary"
            icon={<Edit />}
            style={{
              paddingRight: 0,
              marginRight: 5,
            }}
            ariaLabel="Edit"
            onClick={event => {
              event.stopPropagation()
              navigate(`/adminPage/${formId}`)
            }}
          />
          <Icon
            color="primary"
            icon={<FileCopy />}
            style={{
              paddingRight: 0,
              marginRight: 15,
            }}
            ariaLabel="Edit"
            onClick={event => {
              navigator.clipboard.writeText(`${url}${formId}`)
              event.stopPropagation()
              onCopy(formName)
            }}
          />
          <CardContent>
            <Typography
              dir="auto"
              className={classes.content}
              variant="subtitle1"
            >
              {formName}
            </Typography>
          </CardContent>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography color="inherit" className={classes.link}>
            <Link href={formId} className={classes.link}>
              {`${url}${formId}`}
            </Link>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Card>
  )
}

MiniFormItem.propTypes = {
  formName: PropTypes.string,
  formId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onCopy: PropTypes.func,
  removeForm: PropTypes.func.isRequired,
}
MiniFormItem.defaultProps = {
  formName: 'Unknown Form',
  onCopy: Function.prototype,
}

export default withStyles(styles)(MiniFormItem)
