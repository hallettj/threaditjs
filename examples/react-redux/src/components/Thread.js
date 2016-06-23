/* @flow */

import React       from 'react'
import { Link }    from 'react-router'
import { connect } from 'react-redux'
import { select }  from 'redux-crud-store'
import * as C      from '../models/Comment'
import * as Api    from '../actions/api'
import * as App    from '../actions/app'
import Loading     from './Loading'

import type { Selection }                from 'redux-crud-store'
import type { State }                    from '../reducers'
import type { Comment as CommentRecord } from '../models/Comment'

type ThreadProps = {
  commentId: string,
  comments:  Selection<CommentRecord[]>,
  dispatch:  Function,
  replying:  boolean,
}

export class Thread extends React.Component<void,ThreadProps,void> {

  componentWillMount() {
    const { dispatch, comments } = this.props
    if (comments.needsFetch) {
      dispatch(comments.fetch)
    }
  }

  componentWillReceiveProps(nextProps: ThreadProps) {
    const { comments } = nextProps
    const { dispatch } = this.props
    if (comments.needsFetch) {
      dispatch(comments.fetch)
    }
  }

  render(): React.Element {
    const { commentId, comments, dispatch } = this.props
    if (comments.loading) {
      return <Loading/>
    }
    else if (comments.error) {
      return <h2>Error!  Try refreshing!</h2>
    }
    else {
      const data = comments.data || []
      const comment = C.getComment(commentId, data)
      return <Comment comment={comment} comments={data} {...this.props} />
    }
  }

}

type CommentProps = {
  comment:  CommentRecord,
  comments: CommentRecord[],
  dispatch: Function,
  replying: boolean,
}

class Comment extends React.Component<void,CommentProps,void> {

  render(): React.Element {
    const { comment, comments, dispatch, replying } = this.props
    const children = C.getChildren(comment, comments).map(c => (
      <Comment key={c.id} comment={c} {...this.props} />
    ))
    return (
      <div className="comment">
        <p dangerouslySetInnerHTML={{__html: comment.text}}></p>
        <div className="reply">
          {replying
            ? <a onClick={this.toggleReply.bind(this)} href="#">Reply</a>
            : <form onSubmit={this.handleSubmit.bind(this)}>
                <textarea ref="text" />
                <input type="submit" value="Post!"/>
              </form>
          }
        </div>
        <div className="children">{children}</div>
      </div>
    )
  }

  toggleReply(event: Event) {
    event.preventDefault()
    this.props.dispatch(App.toggleReply())
  }

  handleSubmit(event: Event) {
    event.preventDefault()
    const { comment, dispatch } = this.props
    const text = this.refs.text.value
    dispatch(Api.createComment(text, comment.id))
  }

}

function mapStateToProps(state: State, ownProps: Object): $Shape<ThreadProps> {
  const threadId = ownProps.params.id
  return {
    commentId: threadId,
    comments: select(Api.fetchComments(threadId), state.models),
    replying: state.app.replying,
  }
}

export default connect(mapStateToProps)(Thread)
