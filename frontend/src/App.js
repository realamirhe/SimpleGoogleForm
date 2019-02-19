import React, { Component } from 'react'
import * as R from 'ramda'
// Component
import AdminPage from './components/forms/list/list'
import { Router } from '@reach/router'
import SignIn from './components/auth/signIn'
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
        <AdminPage
          path="/adminPage"
          forms={[]}
          isAdminLoggedIn={isAdminLoggedIn}
        />
        <SignIn path="/" setIsAdminLoggedIn={this.setIsAdminLoggedIn} />
        {/* <NotFound  default /> */}
      </Router>
    )
  }
}

export default App
