/* @flow */

export type Action =
  | { type: 'toggleReply', inReplyTo: string }

export function toggleReply(threadId: string): Action {
  return { type: 'toggleReply', inReplyTo: threadId }
}
