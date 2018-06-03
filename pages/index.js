import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import cookie from 'cookie'

import withData from '../lib/withData'
import checkLoggedIn from '../lib/checkLoggedIn'
import redirect from '../lib/redirect'

class Index extends Component {
  static async getInitialProps(context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context, apolloClient)

    return { loggedInUser }
  }

  render() {
    const { account } = this.props.loggedInUser
    if (account) {
      return (
        <Fragment>
          <h1> Hello {account.name}! </h1>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
            <br />
            <br />
            <a href='/connect/github'>Link Account With GitHub</a>
            <br />
            <button onClick={() => redirect({}, '/logout')}>Logout</button>
            <Link href='/profile'>
              <a>Go to Profile</a>
            </Link>
          </div>
        </Fragment>
      )
    }

    return (
      <div>
        <h1> Auth Example with Next.js and Apollo </h1>
        <Link href='/login'>
          <a>Login</a>
        </Link>{' '}
        or{' '}
        <Link href='/signup'>
          <a>Signup</a>
        </Link>{' '}
        to view hidden resources
        <br /> <br />
        <a href='/auth/github'>Auth With GitHub</a>
      </div>
    )
  }
}

export default withData(Index)
