/* eslint-disable */

// Encryption module
// const fernet = require('fernet')

// all of theses $item are globally declare
export default ({ app }, inject) => {
  inject('debugLog', (msg) => {
    if (process.env.NODE_ENV !== 'production') {
    }
  })
  inject('formatDate', (date) => {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString()
  })
  inject('dateNow', () => {
    return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10)
  })
  inject('encryptWithFernet', (obj, fk) => {
    // Generate Secret with key string
    const secretKey = new fernet.Secret(fk)
    // Create Token
    const token = new fernet.Token({
      secret: secretKey,
    })

    // Convert to JSON string
    const jsonObject = JSON.stringify(obj)
    // Encode data
    const encodedMessage = token.encode(jsonObject)
    // Encrypt to JSON before send
    const objCrypted = {
      crypt: encodedMessage,
    }

    // Return final object
    return objCrypted
  })
  // inject('decryptWithFernet', (obj, fk) => {
  //   // Generate Secret with key string
  //   const secretKey = new fernet.Secret(fk)
  //   // Create Token
  //   const token = new fernet.Token({
  //     secret: secretKey,
  //     ttl: 0,
  //   })

  //   // decrypt data
  //   const decodMessage = token.decode(obj)

  //   // Convert to JSON string
  //   const jsonObject = JSON.parse(decodMessage)

  //   // Return final object
  //   return jsonObject
  // })
  inject('toBase64', (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        return resolve(reader.result)
      }
      reader.onerror = (error) => {
        return reject(error)
      }
    })
  })
  inject('str_limit', (str, limit) => {
    if (!str) return ''
    str = str.toString()
    if (str.length <= limit) return str
    return str.substr(0, limit) + '...'
  })
}
