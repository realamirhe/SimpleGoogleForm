import React, { Component, Fragment } from 'react'
// Components
import AdminPage from '../forms/list/list'
import AdminFillForm from '../users/admin/form'
import AdminCreateForm from '../users/admin/formInfo'
import LinkPreview from '../../helper/components/linkPreview'
// helper
import { getForms } from '../../helper/functions/requestHandler'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newFormInfo: null,
      newPageId: null,
      forms: [],
    }

    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    getForms().then(forms => this.setState({ forms }))
  }
  onChange = (key, value) => this.setState({ [key]: value })

  render() {
    const { isAdminLoggedIn, mode, location } = this.props
    const { newFormInfo, newPageId, forms } = this.state
    return (
      <Fragment>
        {mode === 'forms' ? (
          <AdminPage
            forms={forms}
            isAdminLoggedIn={isAdminLoggedIn}
            selectForm={this.onChange}
          />
        ) : mode === 'linkPreview' ? (
          <LinkPreview link={`${location.origin}/forms/${newPageId}`} />
        ) : mode === 'createFormInfo' ? (
          <AdminCreateForm
            setNewFormInfo={value => this.onChange('newFormInfo', value)}
          />
        ) : mode === 'createNewForm' ? (
          <AdminFillForm
            {...newFormInfo}
            setNewPageId={value => this.onChange('newPageId', value)}
          />
        ) : (
          <AdminFillForm formId={mode} editMode />
        )}
      </Fragment>
    )
  }
}

export default App
