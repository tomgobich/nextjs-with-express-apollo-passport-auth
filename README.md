# Next.js with Express, Apollo, and Auth using Passport

[WIP] 

This example is a customized implementation of [ooaed's next-apollo-auth boilerplate](https://github.com/ooade/next-apollo-auth) that's merged with [Next.js example with-apollo-auth](https://github.com/zeit/next.js/tree/canary/examples/with-apollo-auth).

*Node Version Note*
This project uses [object descructoring [see support]](https://node.green/#ES2015-syntax-destructuring--assignment-object-destructuring-expression) within the Express server, so either use Node v6.4.0+ or replace the destructuring within `server > data > resolvers.js`

*Graphql File Types*
Within next.config.js you'll find an exported function called withGraphql. This enabled us to use the `.graphql || .gql` file types. This has yet to be implemented.

## Main Technologies Used

* Apollo GraphQl
* Express.js
* Express Validator
* Next.js
* Passport.js
* Passport-local-mongoose
* Passport-github
* PostCSS Styled JSX
* Lost Grid
* Minimalistic Tailwind config for style guide

## Contents

* [Project Structure](#project-structure)
* [Mutations](#mutations)
  * [Schema](#schema)
  * [Resolvers](#resolvers)
* [Models](#models)
* [Deploy](#deploy)

### Project Structure

```md
├── components
│   └── forms
│       ├── login.js
│       └── signup.js
├── lib
│   ├── initApollo.js
│   └── withData.js
├── pages
│   ├── index.js
│   ├── login.js
│   └── signup.js
└── server
    ├── data
    │   └── auth
    │   │   ├── mutations.js
    │   │   ├── queries.js
    │   │   └── types.js
    │   ├── resolvers.js
    │   └── schema.js
    ├── models
    │   └── User.js
    ├── services
    │   └── passport.js
    └── index.js
    └── routes.js
```

### Mutations

#### Schema

Here we have one `User`'s type with three fields (email, name, and password), one `Query` type with a profile field just to keep GraphQL's mouth shut about having a Query type defined. We have two `Mutation` types (login, and signup). These are exported from `server > data > auth > types.js` into `server > data > schema.js

```ts
type User {
	email: String
	name: String
	password: String
}

type Query {
	profile: User
}

type Mutation {
	createUser(email: String!, name: String, password: String!): User
	login(email: String!, password: String!): User
}
```

#### Resolvers

The resolvers we care about here are `createUser` and `login`. They both take in `email` and `password` as arguments with `createUser` taking an extra `name` argument.

```js
Mutation: {
		createUser(root, { email, name, password }, { login }) {
			const user = new User({ email, name })

			return new Promise((resolve, reject) => {
				return User.register(user, password, err => {
					if (err) {
						reject(err)
					} else {
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
					} else {
						reject('Email / Password Incorrect')
					}
				})
			})
		}
	}
```

### Models

Oops! We have only one model (User). It accepts email, validates the email with `express-validator`. Then we have a plugin to tell `passport-local-mongoose` to use our email field as the default `usernameField`.

```js
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      isAsync: true,
      validator: (v, cb) => cb(validator.isEmail(v), `${v} is not a valid email address`)
    },
    required: 'Please provide a valid email address'
  },
  name: {
    type: String,
    trim: true,
    required: 'Please provide a name'
  },
  github: {
    id: String,
    name: String,
    email: String
  }
})

userSchema.plugin(passportLocalMongoose, {
	usernameField: 'email',
	errorMessages: {
		UserExistsError: 'Email Already Exists'
	}
})
```

### Deploy

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/ooade/next-apollo-auth)

### License

MIT
