/* @flow */

import React       from 'react'
import { Link }    from 'react-router'
import { connect } from 'react-redux'
import { select }  from 'redux-crud-store'
import * as Api    from '../actions/api'

import type { Selection }              from 'redux-crud-store'
import type { State }                  from '../reducers'
import type { Thread as ThreadRecord } from '../models/Thread'

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

}

function mapStateToProps(state: State): $Shape<HomeProps> {
  return {
    threads: select(Api.fetchThreads(), state.models)
  }
}

export default connect(mapStateToProps)(Home)
