import React, { Component, Fragment } from 'react'
import checkLoggedIn from '../lib/checkLoggedIn'
import withData from '../lib/withData'
import redirect from '../lib/redirect'
import LoginForm from '../components/forms/login'

class Login extends Component {
  static async getInitialProps(context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context, apolloClient)

    if (loggedInUser.account) {
      redirect(context, '/')
    }
  }

  render() {
    return (
      <Fragment>
        <h1> Login To Continue! </h1>
        <LoginForm />
      </Fragment>
    )
  }
}

export default withData(Login)
