/** @module notes/NoteList */

import React, {  Component } from 'react';
import NotePreview from './NotePreview';
import actions from './Actions'

export default class NoteList extends Component {
  constructor() {
    super()
    this.showModal = this.showModal.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  showModal() {
    this.refs.modal.show();
  }

  onCancel() {
    this.refs.modal.hide();
  }

  render() {
    let formTitle = 'Update this note'

    return (
      <div>
        <div className="row small-up-1 medium-up-2">
          {this.props.notes.map( (note, index) =>
            <div className="column" key={note._id}>
              <a onClick={() => { this.props.onClick(note, formTitle) }} >
                <NotePreview
                  {...note}
                  />
              </a>
            </div>
          )}
        </div>
      </div>
    )
  }
}
