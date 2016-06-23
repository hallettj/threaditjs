/* @flow */

import React                            from 'react'
import { render }                       from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider }                     from 'react-redux'
import { routerMiddleware }             from 'react-router-redux'
import { ApiClient }                    from 'redux-crud-store'
import sagaMiddleware                   from 'redux-saga'
import logger                           from 'redux-logger'
import reducers                         from './src/reducers'
import sagas                            from './src/sagas'
import Home                             from './src/components/Home'
import Thread                           from './src/components/Thread'
import {
  Router, Route, hashHistory
} from 'react-router'

const API_URL = 'http://api.threaditjs.com'

const history = hashHistory
const router = routerMiddleware(history)
const saga = sagaMiddleware()

const middleware = process.env.NODE_ENV === 'production' ?
  [ router, saga ] :
  [ router, saga, logger() ]

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)

const apiClient = new ApiClient({
  basePath: API_URL
})

saga.run(sagas, apiClient)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/"           component={Home}   />
      <Route path="/thread/:id" component={Thread} />
    </Router>
  </Provider>,
  document.querySelector('.main')
)
