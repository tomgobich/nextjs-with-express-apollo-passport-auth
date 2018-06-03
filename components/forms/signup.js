import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class signup extends React.Component {
  state = {
    email: null,
    name: null,
    password: null,
    error: null
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    let { email, name, password } = this.state

    // Check non null email && password
    if (typeof email === 'string' && typeof name === 'string' && typeof password === 'string') {
      // trim fields
      email = email.trim()
      name = name.trim()
      password = password.trim()

      // Check for email && password length
      if (email.length > 0 && name.length > 0 && password.length > 0) {
        this.props
          .mutate({
            variables: { email, name, password }
          })
          .then(() => {
            this.setState({ error: null })
            window.location = '/'
          })
          .catch(({ graphQLErrors: err }) => this.setState({ error: err[0].message }))
      }
      else {
        this.setState({ error: "Email, name, & password fields shouldn't be empty" })
      }
    }
    else {
      this.setState({ error: 'Email, name, & password fields are required!' })
    }
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div>
          <span className='error'>{this.state.error}</span>
        </div>
        <div>
          <label> Email Address </label>
          <input type='email' onInput={(e) => this.setState({ email: e.target.value })} placeholder='john@doe.com' />
        </div>
        <div>
          <label> Name </label>
          <input type='text' onInput={(e) => this.setState({ name: e.target.value })} placeholder='John Doe' />
        </div>
        <div>
          <label> Password </label>
          <input type='password' onInput={(e) => this.setState({ password: e.target.value })} placeholder='******' />
        </div>
        <div>
          <button> Sign up </button>
        </div>
        <style jsx>
          {`
            * {
              box-sizing: border-box;
              margin: 0;
            }

            h1 {
              margin: 2rem 0;
            }

            label {
              display: block;
            }

            form > div {
              margin-top: 1rem;
            }

            input,
            button {
              padding: 0.5rem;
            }

            button {
              width: 12rem;
              border: none;
              cursor: pointer;
            }

            .error {
              color: red;
              display: block;
              margin: 1rem 0;
            }
          `}
        </style>
      </form>
    )
  }
}

const mutator = gql`
  mutation createUser($email: String!, $name: String!, $password: String!) {
    createUser(email: $email, name: $name, password: $password) {
      email
    }
  }
`
export default graphql(mutator)(signup)
