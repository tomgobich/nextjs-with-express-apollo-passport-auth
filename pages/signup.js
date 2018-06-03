import React, { Component, Fragment } from 'react'
import checkLoggedIn from '../lib/checkLoggedIn'
import withData from '../lib/withData'
import redirect from '../lib/redirect'
import SignupForm from '../components/forms/signup'

class Signup extends Component {
  static async getInitialProps(context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context, apolloClient)

    if (loggedInUser.account) {
      redirect(context, '/')
    }
  }

  render() {
    return (
      <Fragment>
        <h1> Create An Account! </h1>
        <SignupForm />
      </Fragment>
    )
  }
}

export default withData(Signup)
