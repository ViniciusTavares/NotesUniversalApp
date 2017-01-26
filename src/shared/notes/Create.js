/** @module notes/Create */

import React, { Component } from 'react'

export default class AddNew extends Component {
  render() {
    let formTitle = 'Create note'

    return (
      <div>
        <div className="row column">
          <div className="small-12">
            <div className="clearfix">
              <button type="button"  onClick={(e) => { this.props.onClick({}, formTitle) }}  className="button dark float-right"> Create </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
