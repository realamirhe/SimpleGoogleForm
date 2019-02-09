import React, { Component } from 'react'
// Component
// import SignUp from './components/auth/signUp'
// import SignIn from './components/auth/signIn'
import Pack from './components/form/pack'
import Submit from './components/form/submit'
// style
import './App.scss'

/* App */
class App extends Component {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <Pack from={1} count={240} />
        <Submit />
      </div>
    )
  }
}
export default App
