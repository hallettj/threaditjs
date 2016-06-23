/* @flow */

export type Action =
  | { type: 'toggleReply' }

export function toggleReply() {
  return { type: toggleReply }
}
