/* @flow */

import React       from 'react'
import { Link }    from 'react-router'
import { connect } from 'react-redux'
import { select }  from 'redux-crud-store'
import * as Api    from '../actions/api'
import Loading     from './Loading'

import type { Selection }              from 'redux-crud-store'
import type { State }                  from '../reducers'
import type { Thread as ThreadRecord } from '../models/Thread'

declare var T

type HomeProps = {
  dispatch: Function,
  threads: Selection<ThreadRecord[]>
}

export class Home extends React.Component<void,HomeProps,void> {

  componentWillMount() {
    const { dispatch, threads } = this.props
    if (threads.needsFetch) {
      dispatch(threads.fetch)
    }
  }

  componentWillReceiveProps(nextProps: HomeProps) {
    const { threads } = nextProps
    const { dispatch } = this.props
    if (threads.needsFetch) {
      dispatch(threads.fetch)
    }
  }

  render(): React.Element {
    const { threads, dispatch } = this.props
    if (threads.isLoading) {
      return <Loading/>
    }
    else if (threads.error) {
      return <h2>Error!  Try refreshing!</h2>
    }
    else {
      const data = threads.data || []
      const threadElems = data.map(thread => (
        <ThreadListItem key={thread.id} thread={thread} />
      ))
      return (
        <div className="thread_list">
          {threadElems}
          <form onSubmit={this.handleSubmit.bind(this)}>
            <textarea ref="text"></textarea>
            <input type="submit" value="Post!"/>
          </form>
        </div>
      )
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault()
    const text = this.refs.text.value
    // TODO: create thread
  }

}

type ThreadListItemProps = {
  thread: ThreadRecord,
}

const snip = T.trimTitle

function ThreadListItem(props: ThreadListItemProps): React.Element {
  const { comment_count, id, text } = props.thread
  return (
    <div>
      <p className="thread_title">
        <Link to={`/thread/${id}`}>{snip(text)}</Link>    // `
      </p>
      <p className="comment_count">{comment_count} comment(s)</p>
      <hr/>
    </div>
  )
}

function mapStateToProps(state: State): $Shape<HomeProps> {
  return {
    threads: select(Api.fetchThreads(), state.models)
  }
}

export default connect(mapStateToProps)(Home)
