const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const { authTypes, authQueries, authMutations } = require('./auth/types')

const typeDefs = `
	${authTypes}
	type Query {
		${authQueries}
	}
	type Mutation {
		${authMutations}
	}
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
