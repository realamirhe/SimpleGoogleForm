// modules
import { encrypt, decrypt } from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'

const SECRET = 'ya ali 110'

// Store data.
const save = (key, value) => {
  localStorage.setItem(key, encrypt(JSON.stringify(value), SECRET).toString())
}

// load data
const load = key => {
  try {
    return JSON.parse(decrypt(localStorage.getItem(key), SECRET).toString(Utf8))
  } catch {
    return null
  }
}

export { save, load }
