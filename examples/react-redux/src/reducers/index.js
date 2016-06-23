/* @flow */

import { combineReducers }        from 'redux'
import { crudReducer }            from 'redux-crud-store'
import { reducer as formReducer } from 'redux-form'
import { routerReducer }          from 'react-router-redux'
import  appReducer                from './app'

import type { State as AppState } from './app'

export type State = {
  app:     AppState,
  form:    Object,  // state from 'redux-form'
  models:  Object,  // state from 'redux-crud-store'
  routing: Object,  // state from 'react-router-redux'
}

export default combineReducers({
  app:     appReducer,
  form:    formReducer,
  models:  crudReducer,
  routing: routerReducer,
})
