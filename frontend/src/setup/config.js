export default (process.env.NODE_ENV === 'development'
  ? { server: 'http://localhost:3001' } // ''
  : { server: 'https://google-form.herokuapp.com' })
