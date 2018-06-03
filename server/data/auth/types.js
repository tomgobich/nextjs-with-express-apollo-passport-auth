const authTypes = `
  type User {
    email: String!
    name: String!
    github: GitHub
  }

  type GitHub {
    id: Int
    name: String
    email: String
  }
`

const authQueries = `
  account: User
`

const authMutations = `
  createUser(email: String!, name: String!, password: String!): User
  login(email: String!, password: String!): User
  authGithub: User
`

module.exports = { authTypes, authQueries, authMutations }
