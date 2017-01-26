/** @module notes/NotePreview */

import React, { Component } from 'react';
import moment from 'moment'

export default class NotePreview extends Component {
  static propTypes = {
    body: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
    category: React.PropTypes.object.isRequired
  }


  render() {

    let noteBody = this.props.body.length > 300
    ? this.props.body.substr(0, 300) + ' ...'
    : this.props.body

    return (
      <div className="preview-card">
        <div className="card">
          <div className="card-divider">
            <div className="clearfix">
              <small className="float-left">{ moment(this.props.date).format('lll') }</small>
              <i className="float-right fa fa-edit"></i>
            </div>
          </div>
          <div className="card-section">
            <h4>  { this.props.title } - <small> {this.props.category.name}</small> </h4>
            <p> { noteBody } </p>
          </div>
        </div>
      </div>
    )}
  }
