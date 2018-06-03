const authQueries = require('./auth/queries')
const authMutations = require('./auth/mutations')

module.exports = {
  Query: {
    ...authQueries
  },
  Mutation: {
    ...authMutations
  }
}
