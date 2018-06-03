import { Fragment } from 'react'
import tailwind, { colors } from '../tailwind'

export default () => (
  <Fragment>
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }

      html,
      body {
        height: 100%;
      }

      body {
        color: ${colors.black};
        background-color: ${colors.white};
        margin: 0;
      }

      .container {
        width: 100%;
        max-width: 1200px;
        padding: ${tailwind.padding[4]};
        margin: 0 auto;
      }

      .container-fluid {
        width: 100%;
        padding: ${tailwind.padding[4]};
      }
    `}</style>
  </Fragment>
)
