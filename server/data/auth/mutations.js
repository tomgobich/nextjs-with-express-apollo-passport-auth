const passport = require('passport')
const User = require('../../models/User')

module.exports = {
  createUser(root, { email, name, password }, { login }) {
    const user = new User({ email, name })

    return new Promise((resolve, reject) => {
      return User.register(user, password, (err) => {
        if (err) {
          reject(err)
        }
        else {
          login(user, () => resolve(user))
        }
      })
    })
  },
  login(root, { email, password }, { login }) {
    return new Promise((resolve, reject) => {
      return User.authenticate()(email, password, (err, user) => {
        // user returns false if username / email incorrect
        if (user) {
          login(user, () => resolve(user))
        }
        else {
          reject('The email or password you supplied is incorrect')
        }
      })
    })
  },
  authGithub(root, args, { statusCode, setHeader, res }) {
    return new Promise((resolve, reject) => {
      return passport.authenticate('github', (err, user) => {
        if (user) {
          resolve(user)
        }
        else {
          reject(err)
        }
      })({}, { statusCode, setHeader, end })
    })
  }
}
