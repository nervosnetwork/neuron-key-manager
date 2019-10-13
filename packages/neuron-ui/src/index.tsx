import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'

import 'theme'
import 'styles/index.scss'
import 'utils/i18n'

import Notification from 'containers/Notification'
import Main from 'containers/Main'
import ErrorBoundary from 'components/ErrorBoundary'
import withProviders from 'states/stateProvider'

export const containers: CustomRouter.Route[] = [
  {
    name: 'Main',
    path: '/',
    exact: false,
    comp: Main,
  },
  {
    name: 'Notification',
    path: '/',
    exact: false,
    comp: Notification,
  },
]

const App = withProviders(({ dispatch }: any) => (
  <Router>
    {containers.map(container => {
      return (
        <Route
          {...container}
          key={container.name}
          render={routeProps => (
            <ErrorBoundary>
              <container.comp {...routeProps} dispatch={dispatch} />
            </ErrorBoundary>
          )}
        />
      )
    })}
  </Router>
))

Object.defineProperty(App, 'displayName', {
  value: 'App',
})

ReactDOM.render(<App />, document.getElementById('root'))

export default undefined
