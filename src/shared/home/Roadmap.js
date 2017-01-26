/** @module home/PatternsAndPrinciples */

import React, { Component } from 'react'

export default class Roadmap extends Component {
  render() {
    return (
      <div>
        <div className="row column area-title">
          <h3>Roadmap for February 2017</h3>
        </div>
        <div className="row column">
          <ul>
            <li>Add unit tests</li>
            <li>Create tasks for development and production enviroments</li>
            <li>Add devtools in store</li>
          </ul>
        </div>
      </div>
    )
  }
}
