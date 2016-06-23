/* @flow */

// Generator type parameters are of the form: `Generator<+Yield,+Return,-Next>`

import { crudSaga } from 'redux-crud-store'

import type { Effect } from 'redux-saga'

export default function* root(apiClient: Object): Generator<Effect,void,any> {
  yield* crudSaga(apiClient)()
}
