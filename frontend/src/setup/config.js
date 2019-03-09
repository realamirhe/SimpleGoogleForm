export default (process.env.NODE_ENV === 'development'
  ? { server: 'https://google-form.herokuapp.com' } // 'http://localhost:3001'
  : { server: 'https://google-form.herokuapp.com' })
