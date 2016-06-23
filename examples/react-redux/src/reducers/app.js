/* @flow */

import type { Action } from '../actions/app'

export type State = {
  replying: ThreadId[],
}

const initialState: State = {
  replying: [],
}

type ThreadId = string

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'toggleReply':
      const threadId = action.inReplyTo
      const replyFormOpen = state.replying.some(id => id === threadId)
      const replying = replyFormOpen
        ? state.replying.filter(id => id !== threadId)
        : state.replying.concat(threadId)
      return {
        ...state,
        replying,
      }
    default:
      return state
  }
}
