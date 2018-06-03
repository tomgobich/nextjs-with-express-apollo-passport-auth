import React, { Component } from 'react'
import checkLoggedIn from '../lib/checkLoggedIn'
import withData from '../lib/withData'

class Profile extends Component {
  static async getInitialProps(context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context, apolloClient)

    return { user: loggedInUser.account }
  }

  render() {
    const { user } = this.props

    if (user) {
      return (
        <div>
          <p>{user.name} Profile</p>
          <p> Fullname: {user.name || user.github.name}</p>
          <p> Email: {user.email || user.github.email}</p>
        </div>
      )
    }

    return <div>Not found!</div>
  }
}

export default withData(Profile)
