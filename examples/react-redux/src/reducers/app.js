/* @flow */

import type { Action } from '../actions/app'

export type State = {
  replying: boolean,
}

const initialState: State = {
  replying: false,
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'toggleReply':
      return {
        ...state,
        replying: !state.replying,
      }
    default:
      return state
  }
}
