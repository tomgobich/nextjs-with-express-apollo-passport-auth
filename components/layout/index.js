import Head from 'next/head'
import Header from './header'
import ErrorBoundary from './error-boundary'
import Styles from '../../styles'

function LayoutHeader(props) {
  return props.layoutUsesHeader ? <Header account={props.account} /> : null
}

export default ({ children, account, title = 'This is the default title', layoutUsesHeader = true }) => (
  <div className='app'>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <LayoutHeader account={account} layoutUsesHeader={layoutUsesHeader} />

    <ErrorBoundary>{children}</ErrorBoundary>
    <Styles />
  </div>
)
