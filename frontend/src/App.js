import React, { Component } from 'react'
import * as R from 'ramda'
// Components
import AdminPage from './components/_adminPage/adminPage'
import { Router } from '@reach/router'
import SignIn from './components/auth/signIn'
import StudendForm from './components/users/students/form'

// import NotFound from ''

// helper
import { load } from './helper/functions/localStorage'
// style
import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdminLoggedIn: R.prop('isAdminLoggedIn', load('state')),
    }

    this.setIsAdminLoggedIn = this.setIsAdminLoggedIn.bind(this)
  }
  setIsAdminLoggedIn = value => this.setState({ isAdminLoggedIn: value })

  render() {
    const { isAdminLoggedIn } = this.state
    return (
      <Router>
        <AdminPage path="/adminPage/:mode" isAdminLoggedIn={isAdminLoggedIn} />
        <SignIn path="/" setIsAdminLoggedIn={this.setIsAdminLoggedIn} />
        <StudendForm path="/forms/:formId" />
        {/* <NotFound  default /> */}
      </Router>
    )
  }
}

export default App
