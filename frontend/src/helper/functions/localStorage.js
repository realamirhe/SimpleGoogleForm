// Retrieve your data from localStorage
// Store data.
const save = userInfo => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
  localStorage.setItem('time', new Date().getTime())
}

// load data
const load = key => JSON.parse(localStorage.getItem(key))

// should user log in again or not
const shouldUserLogIn = () => !load('time')

export { save, load, shouldUserLogIn }
