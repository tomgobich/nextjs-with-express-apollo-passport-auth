import React, { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      info: null
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, info })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div class='container'>
          <h1>Snap! You found a glitch in the system!</h1>
          <p>Please, rest assured, the issue has been logged and emailed to the site's owner</p>
          <pre>
            Error found:
            <small>{this.state.info.componentStack}</small>
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
