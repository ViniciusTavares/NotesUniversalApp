/** @module notes/containers/NoteContainer */

import { connect } from 'react-redux'
import * as noteActions from '../Actions'
import React, { Component } from 'react'
import Notifications from 'react-notification-system-redux';
import Create from '../Create'
import NoteList from '../NoteList'
import NoteForm from './Form'
import Spinner from '../../shell/Spinner'
import Pagination from '../../pagination/Pagination'
import {isServerRendering} from '../../common'

class NoteContainer   extends Component {
  constructor() {
    super()
    this.showModal = this.showModal.bind(this)
    this.closeForm = this.closeForm.bind(this)
    this.selectNote = this.selectNote.bind(this)
  }

  static fetchData({ query, params, store, history }) {
    let page = query.page > 0 ? query.page * 1 : 1
    let limit = query.limit > 0 ? query.limit * 1 : 10

    return store.dispatch(noteActions.fetchNotes({ page , limit }))
  }

  componentDidMount() {
    if (this.props.firstLoad) {
      let pagination = this.getPaginationObject(this.props.location.query)

      return this.props.fetchNotes(pagination)
    }
  }

  componentWillReceiveProps(nextProps) {
    let currentQuery = this.props.location.query
    let nextQuery = nextProps.location.query

    if(currentQuery !== nextQuery) {
      let pagination = this.getPaginationObject(nextQuery)
      return this.props.fetchNotes(pagination)
    }
  }

  getPaginationObject(query) {
    let page = query.page > 0 ? query.page * 1 : 1
    let limit = query.limit > 0 ? query.limit * 1 : 10

    return { page, limit }
  }

  showModal() {
    this.modal.show();
  }

  closeForm() {
    this.modal.hide();
  }

  selectNote(note, formTitle) {
    this.props.onNoteClick(note, formTitle)
    this.showModal()
  }

  render() {
    let {notifications} = this.props;
    let pagination = this.getPaginationObject(this.props.location.query)
    let formComp
    let paginationComp = this.props.count > pagination.limit
    ? <Pagination count={this.props.count} limit={pagination.limit} current={pagination.page} /> : ''

    if(!isServerRendering()) {
      let OutlineModal = require('boron/OutlineModal')

      formComp = (
        <OutlineModal  ref={modal => this.modal = modal } keyboard={true}>
          <NoteForm formTitle={this.props.formTitle} closeForm={this.closeForm} selectedNote={this.props.selectedNote}/>
        </OutlineModal>
      )
    }

    return (
      <div>
        <Create onClick={this.selectNote} categories={this.props.categories} onSave={this.props.onSave} />
        <NoteList onClick={this.selectNote} notes={this.props.notes}/>
        {paginationComp}
        {formComp}
        {
          this.props.loading ? <Spinner /> : ''
        }
        <Notifications
          notifications={notifications}
          />
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    firstLoad: state.notes.firstLoad,
    notes: state.notes.data,
    formTitle: state.notes.formTitle,
    selectedNote: state.notes.selectedNote,
    loading: state.notes.loading,
    notifications:  state.notifications,
    count: state.notes.count
  }),
  (dispatch, ownProps, context) => ({
    fetchNotes: (pagination) => {
      dispatch(noteActions.fetchNotes(pagination))
    },
    onNoteClick: (selectedNote, formTitle) => {
      dispatch(noteActions.selectNote(selectedNote, formTitle))
    }
  })
)(NoteContainer)
