import React from 'react'
import PropTypes from 'prop-types'
// third-party-packages
import { map } from 'ramda'
// component
import MiniFormItem from '../item'
// style
import './style.scss'

/* Mini Form List  */
const MiniFormList = ({ forms }) => {
  return (
    <div className="mini-form__list">
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
