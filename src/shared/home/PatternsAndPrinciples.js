/** @module home/PatternsAndPrinciples */

import React, { Component } from 'react'

export default class PatternsAndPrinciples extends Component {
  render() {
    return (
      <div>
        <div className="row column area-title">
          <h3>Patterns and principles</h3>
        </div>
        <div className="row column">
          <ul>
            <li>Single page application</li>
            <li>Domain based</li>
            <li>State container</li>
            <li>Factories</li>
            <li>Multi layer</li>
            <li>Singleton</li>
            <li>Universal javascript</li>
            <li>Generic repository</li>
          </ul>
        </div>
      </div>
    )
  }
}
