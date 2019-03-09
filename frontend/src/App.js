import React, { Component } from 'react'
import * as R from 'ramda'
// Components
import AdminPage from './components/_adminPage/adminPage'
import { Router } from '@reach/router'
import SignIn from './components/auth/signIn'
import StudentForm from './components/users/students/form'

import NotFound from './components/notFoundPage'

// helper
import { load } from './helper/functions/localStorage'
// style
import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdminLoggedIn: load('isAdminLoggedIn'),
    }
    this.setAppState = this.setAppState.bind(this)
  }
  setAppState = (key, value) => this.setState({ [key]: value })

  render() {
    const { isAdminLoggedIn } = this.state
    return (
      <Router>
        <AdminPage path="/adminPage/*" isAdminLoggedIn={isAdminLoggedIn} />
        <SignIn path="/" setAppState={this.setAppState} />
        <StudentForm path="/forms/:formId" />
        <NotFound default />
      </Router>
    )
  }
}

export default App
