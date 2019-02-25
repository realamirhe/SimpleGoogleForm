import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
// third-party-packages
import { map } from 'ramda'
// assets
import NoteAdd from '@material-ui/icons/NoteAdd'
// component
import Icon from '../../../helper/components/Icon'
import MiniFormItem from '../item'
// style
import './style.scss'

// TODO: onClick Add Icon
/* Mini Form List  */
const MiniFormList = ({ forms, isAdminLoggedIn }) => {
  if (!isAdminLoggedIn) setTimeout(navigate, 0, '/')
  return (
    <Fragment>
      {isAdminLoggedIn && (
        <div className="mini-form__list">
          <Icon
            color="primary"
            icon={<NoteAdd style={{ width: 30, height: 30 }} />}
            ariaLabel="note-add"
            size="large"
            text="ساخت فرم جدید"
            style={{ width: 120, borderRadius: 14 }}
            onClick={() => navigate('/adminPage/createFormInfo')}
          />
          {map(
            ({ name, _id }) => (
              <MiniFormItem key={_id} formName={name} formId={_id} />
            ),
            forms,
          )}
        </div>
      )}
    </Fragment>
  )
}

MiniFormList.propTypes = {
  forms: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default MiniFormList
