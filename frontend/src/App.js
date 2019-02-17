import React, { Component } from 'react'
// Component
// import SignUp from './components/auth/signUp'
// import SignIn from './components/auth/signIn'
// import Pack from './components/form/pack'
// import Form from './helper/components/form'
import Forms from './components/forms/list'
import Submit from './helper/components/animatedButton'
// style
import './App.scss'
// import { getForm } from './helper/requestHandler'

/* App */
class App extends Component {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        {/* <Submit text="submit" /> */}
        <Forms
          forms={[
            { formName: 'Azmon Reyazi 2', formId: '2' },
            {
              formName:
                'Azmon Reyaziklhsadglkhadklshgklhaklsdghklhaklgklhsgkl 2',
              formId: '2',
            },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            {
              formName: 'Azmon klahsgklhasklhglkahgklhaklshgklhgasklReyazi 2',
              formId: '2',
            },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
            { formName: 'Azmon Reyazi 2', formId: '2' },
          ]}
        />
      </div>
    )
  }
}
export default App
