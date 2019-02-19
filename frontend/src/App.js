import React from 'react'
// Component
// import FormMaker from './components/users/admin/formInfo'
import Form from './helper/components/form'
// style
import './App.scss'

/* App */
const App = props => (
  <div>
    <Form
      disableSound
      admin
      initialQuestionCount={35}
      initialQuestions={[
        2,
        2,
        2,
        2,
        null,
        4,
        4,
        3,
        null,
        1,
        2,
        2,
        2,
        2,
        3,
        2,
        2,
        2,
        2,
        null,
        4,
        4,
        3,
        null,
        1,
        2,
        2,
        2,
        2,
        3,
        null,
        null,
        null,
        null,
        null,
      ]}
      initialFormName="cost(nnt)"
    />
  </div>
  // <Router>
  // <Route authenticateURL component={signIn}/>
  // </Router>
)

export default App
