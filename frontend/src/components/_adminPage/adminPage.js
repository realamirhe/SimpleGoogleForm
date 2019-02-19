import React, { Component, Fragment } from 'react'
import * as R from 'ramda'
// Components
import AdminPage from '../forms/list/list'
import AdminFillForm from '../users/admin/form'
import AdminCreateForm from '../users/admin/formInfo'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newFormInfo: null,
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange = (key, value) => this.setState({ [key]: value })

  render() {
    const { isAdminLoggedIn, mode } = this.props
    const { newFormInfo } = this.state
    return (
      <Fragment>
        {mode === 'forms' ? (
          <AdminPage
            forms={[
              { formName: 'hey', formId: '12' },
              { formName: 'hey', formId: '12' },
              { formName: 'hey', formId: '12' },
              { formName: 'hey', formId: '12' },
            ]}
            isAdminLoggedIn={isAdminLoggedIn}
            selectForm={this.onChange}
          />
        ) : mode === 'createFormInfo' ? (
          <AdminCreateForm
            setNewFormInfo={value => this.onChange('newFormInfo', value)}
          />
        ) : mode === 'createNewForm' ? (
          <AdminFillForm {...newFormInfo} />
        ) : (
          <AdminFillForm fromId={mode} />
        )}
      </Fragment>
    )
  }
}

export default App
