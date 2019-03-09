export default (process.env.NODE_ENV === 'development'
  ? { server: 'https://google-form.herokuapp.com' } // ''
  : { server: 'https://google-form.herokuapp.com' })
