/* @flow */

export type Comment = {
  children:      string[],  // list of IDs of child comments
  comment_count: number,
  id:            string,
  text:          string,
  parent?:       string,
}

export function getComment(id: string, comments: Comment[]): Comment {
  return comments.find(c => c.id === id)
}

export function getChildren(comment: Comment, comments: Comment[]): Comment[] {
  return comments.filter(c => comment.children.some(id => id === c.id))
}
