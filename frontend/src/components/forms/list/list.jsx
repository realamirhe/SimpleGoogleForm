import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
// third-party-packages
import * as R from 'ramda'
// assets
import NoteAdd from '@material-ui/icons/NoteAdd'
// component
import Icon from '../../../helper/components/Icon'
import MiniFormItem from '../item'
import WithAppBar from '../../../helper/components/appBar/withAppBar.jsx'
import SimpleBar from 'simplebar-react'

// style
import './style.scss'

// TODO: onClick Add Icon
/* Mini Form List  */
const MiniFormList = ({
  forms,
  isAdminLoggedIn,
  removeForm,
  location: { origin },
}) => {
  if (!isAdminLoggedIn) setTimeout(navigate, 0, '/')
  return (
    <WithAppBar
      leftText="خروج"
      rightText="تغیر رمز عبور"
      onLeftClick={() => {
        localStorage.clear()
        navigate('/')
      }}
      disableBar
      onRightClick={() => navigate('/adminPage/changePassword')}
    >
      {isAdminLoggedIn && (
        <div className="mini-form__list">
          <Icon
            icon={<NoteAdd style={{ width: 50, height: 30 }} />}
            ariaLabel="note-add"
            size="large"
            text="ساخت فرم جدید"
            style={{
              width: 180,
              borderRadius: 15,
              backgroundColor: '#7cb342',
            }}
            onClick={() => navigate('/adminPage/createFormInfo')}
          />
          <SimpleBar
            style={{
              width: '100%',
              minWidth: 490,
              height: 385,
            }}
          >
            <div>
              {R.map(
                ({ name, _id }) => (
                  <MiniFormItem
                    removeForm={removeForm}
                    key={_id}
                    formName={name}
                    formId={_id}
                    url={`${origin}/forms/`}
                  />
                ),
                forms,
              )}
            </div>
          </SimpleBar>
        </div>
      )}
    </WithAppBar>
  )
}

MiniFormList.propTypes = {
  forms: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  removeForm: PropTypes.func.isRequired,
}

export default MiniFormList
