/* @flow */

import {
  fetchCollection,
  fetchRecord,
  createRecord,
  updateRecord,
  deleteRecord,
} from 'redux-crud-store'

import type { CrudAction } from 'redux-crud-store'
import type { Comment }    from '../models/Comment'
import type { Thread }     from '../models/Thread'

export function fetchThreads(): CrudAction<Thread[]> {
  return fetchCollection('threads', '/threads')
}

export function fetchComments(threadId: string): CrudAction<Comment[]> {
  return fetchCollection('comments', `/comments/${encodeURIComponent(threadId)}`)
}

export function createComment(text: string, parentId: string): CrudAction<Comment> {
  return createRecord('comments', '/comments/create', { text, parent: parentId })
}
