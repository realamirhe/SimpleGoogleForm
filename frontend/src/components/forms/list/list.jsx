import React from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import { map } from 'ramda'
// assets
import NoteAdd from '@material-ui/icons/NoteAdd'
// component
import MiniFormItem from '../item'
import Icon from '../../../helper/components/Icon'

// style
import './style.scss'

// TODO: onClick Add Icon
/* Mini Form List  */
const MiniFormList = ({ forms }) => {
  return (
    <div className="mini-form__list">
      <Icon
        color="primary"
        icon={<NoteAdd style={{ width: 30, height: 30 }} />}
        ariaLabel="note-add"
        size="large"
      />
      {map(
        ({ formName, formId }) => (
          <MiniFormItem formName={formName} formId={formId} />
        ),
        forms,
      )}
    </div>
  )
}

MiniFormList.propTypes = {}

export default MiniFormList
