import React, { Component } from 'react'
// Component
// import SignUp from './components/auth/signUp'
// import SignIn from './components/auth/signIn'
import Pack from './components/form/pack'

/* App */
class App extends Component {
  render() {
    return (
      <div>
        <Pack from={1} />
        <Pack from={11} />
      </div>
    )
  }
}
export default App
