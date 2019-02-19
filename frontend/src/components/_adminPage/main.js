import React, { Component, Fragment } from 'react'
import * as R from 'ramda'
// Components
import AdminPage from '../forms/list/list'
import { Router } from '@reach/router'
import AdminFillForm from '../users/admin/form'
import AdminCreateForm from '../users/admin/formInfo'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //   isAdminLoggedIn: R.prop('isAdminLoggedIn', load('state')),
    }

    // this.setIsAdminLoggedIn = this.setIsAdminLoggedIn.bind(this)
  }
  //   setIsAdminLoggedIn = value => this.setState({ isAdminLoggedIn: value })

  render() {
    const { isAdminLoggedIn } = this.props
    console.log(this.props)
    return (
      <Fragment>
        <AdminPage
          path="/"
          forms={[
            { formName: 'hey', formId: '12' },
            { formName: 'hey', formId: '12' },
            { formName: 'hey', formId: '12' },
            { formName: 'hey', formId: '12' },
          ]}
          isAdminLoggedIn={isAdminLoggedIn}
        />
        <AdminCreateForm path="createForm" exact />
        <AdminFillForm path=":formId" />
      </Fragment>
    )
  }
}

export default App
