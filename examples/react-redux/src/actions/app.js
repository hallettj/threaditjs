/* @flow */

export type Action =
  | { type: 'toggleReply', inReplyTo: string }

export function toggleReply(threadId: string) {
  return { type: toggleReply, inReplyTo: threadId }
}
